import sys
from pyspark.sql import SparkSession
from pyspark.sql.functions import asc, desc, col

spark = SparkSession.builder.appName("DataAnalyze").getOrCreate()

# Load household number
hshd_num = sys.argv[4]

# Load data from csv files
household_csv_file = sys.argv[1]
products_csv_file = sys.argv[2]
transactions_csv_file = sys.argv[3]

# Create dataframes
household_df = spark.read.csv(household_csv_file)
products_df = spark.read.csv(products_csv_file)
transactions_df = spark.read.csv(transactions_csv_file)

# Re-Label Headers
household_df = household_df.withColumnRenamed("_c0", "HSHD_NUM").withColumnRenamed("_c1", "L").withColumnRenamed("_c2", "AGE_RANGE").withColumnRenamed("_c3", "MARTIAL") \
.withColumnRenamed("_c4", "INCOME_RANGE").withColumnRenamed("_c5", "HOMEOWNER").withColumnRenamed("_c6", "HSHD_COMPOSITION").withColumnRenamed("_c7", "HH_SIZE") \
.withColumnRenamed("_c8", "CHILDREN")
products_df = products_df.withColumnRenamed("_c0", "PRODUCT_NUM").withColumnRenamed("_c1", "DEPARTMENT").withColumnRenamed("_c2", "COMMODITY").withColumnRenamed("_c3", "BRAND_TY") \
.withColumnRenamed("_c4", "NATURAL_ORGANIC_FLAG")
transactions_df = transactions_df.withColumnRenamed("_c0", "BASKET_NUM").withColumnRenamed("_c1", "HSHD_NUM").withColumnRenamed("_c2", "PURCHASE_DATE") \
.withColumnRenamed("_c3", "PRODUCT_NUM").withColumnRenamed("_c4", "SPEND").withColumnRenamed("_c5", "UNITS").withColumnRenamed("_c6", "STORE_R").withColumnRenamed("_c7", "WEEK_NUM") \
.withColumnRenamed("_c8", "YEAR")

# Sort
household_df = household_df.orderBy(asc("HSHD_NUM"))
products_df = products_df.orderBy(asc("PRODUCT_NUM"))
transactions_df = transactions_df.orderBy(asc("HSHD_NUM"))

# Join Households & Transactions
househouldTrans_df = household_df.join(transactions_df, on=["HSHD_NUM"], how="inner")

# Join Households-Transactions & Products
complete_df = househouldTrans_df.join(products_df, on=["PRODUCT_NUM"], how="inner")