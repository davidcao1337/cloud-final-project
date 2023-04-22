import os
import sys
import json
from pyspark.sql import SparkSession
from pyspark.sql.functions import asc, col, trim, regexp_replace
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
household_df = household_df.withColumn('HSHD_NUM', regexp_replace(col("HSHD_NUM"), " ", ""))
household_df = household_df.withColumn('L', regexp_replace(col("L"), " ", ""))
household_df = household_df.withColumn('AGE_RANGE', regexp_replace(col("AGE_RANGE"), " ", ""))
household_df = household_df.withColumn('MARTIAL', regexp_replace(col("MARTIAL"), " ", ""))
household_df = household_df.withColumn('INCOME_RANGE', regexp_replace(col("INCOME_RANGE"), " ", ""))
household_df = household_df.withColumn('HOMEOWNER', regexp_replace(col("HOMEOWNER"), " ", ""))
household_df = household_df.withColumn('HSHD_COMPOSITION', regexp_replace(col("HSHD_COMPOSITION"), " ", ""))
household_df = household_df.withColumn('HH_SIZE', regexp_replace(col("HH_SIZE"), " ", ""))
household_df = household_df.withColumn('CHILDREN', regexp_replace(col("CHILDREN"), " ", ""))

products_df = products_df.withColumnRenamed("_c0", "PRODUCT_NUM").withColumnRenamed("_c1", "DEPARTMENT").withColumnRenamed("_c2", "COMMODITY").withColumnRenamed("_c3", "BRAND_TY") \
.withColumnRenamed("_c4", "NATURAL_ORGANIC_FLAG")
products_df = products_df.withColumn('PRODUCT_NUM', regexp_replace(col("PRODUCT_NUM"), " ", ""))
products_df = products_df.withColumn('DEPARTMENT', regexp_replace(col("DEPARTMENT"), " ", ""))
products_df = products_df.withColumn('COMMODITY', regexp_replace(col("COMMODITY"), " ", ""))
products_df = products_df.withColumn('BRAND_TY', regexp_replace(col("BRAND_TY"), " ", ""))
products_df = products_df.withColumn('NATURAL_ORGANIC_FLAG', regexp_replace(col("NATURAL_ORGANIC_FLAG"), " ", ""))

transactions_df = transactions_df.withColumnRenamed("_c0", "BASKET_NUM").withColumnRenamed("_c1", "HSHD_NUM").withColumnRenamed("_c2", "PURCHASE_DATE") \
.withColumnRenamed("_c3", "PRODUCT_NUM").withColumnRenamed("_c4", "SPEND").withColumnRenamed("_c5", "UNITS").withColumnRenamed("_c6", "STORE_R").withColumnRenamed("_c7", "WEEK_NUM") \
.withColumnRenamed("_c8", "YEAR")
transactions_df = transactions_df.withColumn('BASKET_NUM', regexp_replace(col("BASKET_NUM"), " ", ""))
transactions_df = transactions_df.withColumn('HSHD_NUM', regexp_replace(col("HSHD_NUM"), " ", ""))
transactions_df = transactions_df.withColumn('PURCHASE_DATE', regexp_replace(col("PURCHASE_DATE"), " ", ""))
transactions_df = transactions_df.withColumn('PRODUCT_NUM', regexp_replace(col("PRODUCT_NUM"), " ", ""))
transactions_df = transactions_df.withColumn('SPEND', regexp_replace(col("SPEND"), " ", ""))
transactions_df = transactions_df.withColumn('UNITS', regexp_replace(col("UNITS"), " ", ""))
transactions_df = transactions_df.withColumn('STORE_R', regexp_replace(col("STORE_R"), " ", ""))
transactions_df = transactions_df.withColumn('WEEK_NUM', regexp_replace(col("WEEK_NUM"), " ", ""))
transactions_df = transactions_df.withColumn('YEAR', regexp_replace(col("YEAR"), " ", ""))

# # Join Households & Transactions
househouldTrans_df = household_df.join(transactions_df, on=["HSHD_NUM"], how="inner")
# househouldTrans_df.awaitTermination()

# # Join Households-Transactions & Products
complete_df = househouldTrans_df.join(products_df, on=["PRODUCT_NUM"], how="inner")

# # Default sort by HSHD_NUM
complete_df = complete_df.orderBy(asc("HSHD_NUM"))

# # Data Pull for HSHD_SELECTION
hshd_selection_df = complete_df.filter(col("HSHD_NUM") == hshd_num_selection)

# Default sort by HSHD_NUM
househouldTrans_df = househouldTrans_df.orderBy(asc("HSHD_NUM"))

# Data Pull for HSHD_SELECTION
hshd_selection_df = househouldTrans_df.filter(col("HSHD_NUM") == hshd_num_selection)

# # Sort By Options (HSHD_NUM, BASKET_NUM, DATE, PRODUCT_NUM, DEPARTMENT, COMMODITY)
hshd_selection_df.orderBy(asc(sort_selection))

# Convert Dataframe to JSON and send to dataController
json_data = hshd_selection_df.toJSON().map(lambda x: json.loads(x)).collect()
print(json.dumps(json_data))

# print(json_data)

# complete_df.show()
