import os
import sys
import json
from pyspark.sql import SparkSession
from pyspark.sql.functions import asc, col, trim, regexp_replace, count
from pyspark.sql.streaming import StreamingQuery

os.environ['PYSPARK_PYTHON'] = sys.executable
os.environ['PYSPARK_DRIVER_PYTHON'] = sys.executable
spark = SparkSession.builder.appName("DataAnalyze").getOrCreate()
spark._sc.setLogLevel("OFF")
spark.sparkContext.setLogLevel("OFF")

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
household_df = household_df.drop('HH_SIZE')
household_df = household_df.drop('CHILDREN')
household_df = household_df.withColumn('HSHD_NUM', regexp_replace(col("HSHD_NUM"), " ", ""))
household_df = household_df.withColumn('AGE_RANGE', regexp_replace(col("AGE_RANGE"), " ", ""))

# household_df.show()

transactions_df = transactions_df.withColumnRenamed("_c0", "BASKET_NUM").withColumnRenamed("_c1", "HSHD_NUM").withColumnRenamed("_c2", "PURCHASE_DATE") \
.withColumnRenamed("_c3", "PRODUCT_NUM").withColumnRenamed("_c4", "SPEND").withColumnRenamed("_c5", "UNITS").withColumnRenamed("_c6", "STORE_R").withColumnRenamed("_c7", "WEEK_NUM") \
.withColumnRenamed("_c8", "YEAR")

transactions_df = transactions_df.drop('BASKET_NUM')
transactions_df = transactions_df.drop('PURCHASE_DATE')
transactions_df = transactions_df.drop('SPEND')
transactions_df = transactions_df.drop('UNITS')
transactions_df = transactions_df.drop('STORE_R')
transactions_df = transactions_df.drop('WEEK_NUM')
transactions_df = transactions_df.drop('YEAR')

transactions_df = transactions_df.withColumn('HSHD_NUM', regexp_replace(col("HSHD_NUM"), " ", ""))
transactions_df = transactions_df.withColumn('PRODUCT_NUM', regexp_replace(col("PRODUCT_NUM"), " ", ""))

products_df = products_df.withColumnRenamed("_c0", "PRODUCT_NUM").withColumnRenamed("_c1", "DEPARTMENT").withColumnRenamed("_c2", "COMMODITY").withColumnRenamed("_c3", "BRAND_TY") \
.withColumnRenamed("_c4", "NATURAL_ORGANIC_FLAG")

products_df = products_df.drop('DEPARTMENT')
products_df = products_df.drop('BRAND_TY')
products_df = products_df.drop('NATURAL_ORGANIC_FLAG')

products_df = products_df.withColumn('PRODUCT_NUM', regexp_replace(col("PRODUCT_NUM"), " ", ""))
products_df = products_df.withColumn('COMMODITY', regexp_replace(col("COMMODITY"), " ", ""))


# # Join Households & Transactions
househouldTrans_df = household_df.join(transactions_df, on=["HSHD_NUM"], how="inner")

# # Join Households-Transactions & Products
complete_df = househouldTrans_df.join(products_df, on=["PRODUCT_NUM"], how="inner")

complete_df = complete_df.filter(complete_df.AGE_RANGE!='null')
complete_df = complete_df.filter(complete_df.COMMODITY!='null')

complete_df = complete_df.drop('PRODUCT_NUM')
complete_df = complete_df.drop('HSHD_NUM')

result = complete_df.groupBy('COMMODITY').pivot('AGE_RANGE').agg(count("*"))

result = result.drop('AGE_RANGE')

result.show()
