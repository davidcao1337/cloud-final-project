import sys
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("Hello-Test").getOrCreate()
csv_file = sys.argv[1]

house_hold_df = spark.read.csv(csv_file)

house_hold_df.show()