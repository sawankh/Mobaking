from pytrends.pyGTrends import pyGTrends
import time
import os, sys
from random import randint

google_username = ''
google_password = ''
path = ""

# connect to Google
connector = pyGTrends(google_username, google_password)

# Keyword files
files = ["lol", "dota 2", "hon", "hos", "ic", "mww", "overwatch", "smite", "strife"]

# Loop through the files
for fi in files:
	# Create folder of the game
	os.makedirs(path+fi)
	# Read the file with the keywords
	with open(fi+".txt") as f:
		for line in f:
			# Remove the jump line
			keyword = line.rstrip('\n')
			year = 2014
			# Create folder of the keyword
			os.makedirs(path+fi+"/"+keyword)
			for y in range(1,3):
				month = 1
				for x in range(1,7):
					connector.request_report(keyword,"","","", str(month)+"/"+str(year)+" 2m")
					# wait a random amount of time between requests to avoid bot detection
					time.sleep(randint(5, 10))
					# download file
					connector.save_csv(path+fi+"/"+keyword+"/", keyword+str(year)+str(x))
					# Group of two months
					month = month + 2
				year = year + 1