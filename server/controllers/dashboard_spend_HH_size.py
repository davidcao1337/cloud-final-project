import os
import sys
import json
from pyspark.sql import SparkSession
from pyspark.sql.functions import asc, col, trim, regexp_replace, lit
from pyspark.sql.types import StringType,BooleanType,DateType, IntegerType
from pyspark.sql.streaming import StreamingQuery

os.environ['PYSPARK_PYTHON'] = sys.executable
os.environ['PYSPARK_DRIVER_PYTHON'] = sys.executable
spark = SparkSession.builder.appName("DataAnalyze").getOrCreate()
spark._sc.setLogLevel("OFF")
spark.sparkContext.setLogLevel("OFF")

# Load household number selection & sort selection
hshd_num_selection = 10
sort_selection = "BASKET_NUM"

# Load data from csv files
household_csv_file = 'C:\\Users\\hudso\\sarah\\UC\\Cloud\\400_households.csv'
products_csv_file = 'C:\\Users\\hudso\\sarah\\UC\\Cloud\\400_products.csv'
transactions_csv_file = 'C:\\Users\\hudso\\sarah\\UC\\Cloud\\400_transactions.csv'

# Create dataframes
household_df = spark.read.csv(household_csv_file)
products_df = spark.read.csv(products_csv_file)
transactions_df = spark.read.csv(transactions_csv_file)

# Re-Label Headers
household_df = household_df.withColumnRenamed("_c0", "HSHD_NUM").withColumnRenamed("_c1", "L").withColumnRenamed("_c2", "AGE_RANGE").withColumnRenamed("_c3", "MARTIAL") \
.withColumnRenamed("_c4", "INCOME_RANGE").withColumnRenamed("_c5", "HOMEOWNER").withColumnRenamed("_c6", "HSHD_COMPOSITION").withColumnRenamed("_c7", "HH_SIZE") \
.withColumnRenamed("_c8", "CHILDREN")

household_df = household_df.drop('L')
household_df = household_df.drop('MARTIAL')
household_df = household_df.drop('INCOME_RANGE')
household_df = household_df.drop('HOMEOWNER')
household_df = household_df.drop('HSHD_COMPOSITION')
household_df = household_df.drop('AGE_RANGE')
household_df = household_df.drop('CHILDREN')
household_df = household_df.withColumn('HSHD_NUM', regexp_replace(col("HSHD_NUM"), " ", ""))
household_df = household_df.withColumn('HH_SIZE', regexp_replace(col("HH_SIZE"), " ", ""))
household_df = household_df.filter(household_df.HH_SIZE!='null')

# household_df.show()

transactions_df = transactions_df.withColumnRenamed("_c0", "BASKET_NUM").withColumnRenamed("_c1", "HSHD_NUM").withColumnRenamed("_c2", "PURCHASE_DATE") \
.withColumnRenamed("_c3", "PRODUCT_NUM").withColumnRenamed("_c4", "SPEND").withColumnRenamed("_c5", "UNITS").withColumnRenamed("_c6", "STORE_R").withColumnRenamed("_c7", "WEEK_NUM") \
.withColumnRenamed("_c8", "YEAR")

transactions_df = transactions_df.drop('BASKET_NUM')
transactions_df = transactions_df.drop('PURCHASE_DATE')
transactions_df = transactions_df.drop('PRODUCT_NUM')
transactions_df = transactions_df.drop('UNITS')
transactions_df = transactions_df.drop('STORE_R')
transactions_df = transactions_df.drop('WEEK_NUM')

transactions_df = transactions_df.withColumn('HSHD_NUM', regexp_replace(col("HSHD_NUM"), " ", ""))
transactions_df = transactions_df.withColumn('SPEND', regexp_replace(col("SPEND"), " ", ""))
transactions_df = transactions_df.withColumn('SPEND', col('SPEND').cast(IntegerType()))
transactions_df = transactions_df.withColumn('YEAR', regexp_replace(col("YEAR"), " ", ""))

# # Join Households & Transactions
househouldTrans_df = household_df.join(transactions_df, on=["HSHD_NUM"], how="inner")

# Only show year 2020
househouldTrans_df = househouldTrans_df.filter(househouldTrans_df.YEAR=='2020')

# Default sort by HSHD_NUM
househouldTrans_df = househouldTrans_df.orderBy(asc("HSHD_NUM"))

househouldTotalTrans_df = househouldTrans_df.groupBy('HSHD_NUM').sum('SPEND')
househouldTotalTrans_df = househouldTotalTrans_df.withColumnRenamed("sum(SPEND)", "TOTAL_SPENT")

househouldTotalTrans_df = househouldTotalTrans_df.join(househouldTrans_df, on=["HSHD_NUM"], how="inner")

househouldTotalTrans_df = househouldTotalTrans_df.drop('SPEND')

househouldTotalTrans_df = househouldTotalTrans_df.distinct()

househouldSizeTotalTrans_df = househouldTotalTrans_df.groupBy('HH_SIZE').sum('TOTAL_SPENT')
househouldSizeTotalTrans_df = househouldSizeTotalTrans_df.withColumnRenamed("sum(TOTAL_SPENT)", "HOUSEHOLD_DEMOGRAPHIC_SPENT")

json_data = househouldSizeTotalTrans_df.toJSON().map(lambda x: json.loads(x)).collect()
print(json.dumps(json_data))
