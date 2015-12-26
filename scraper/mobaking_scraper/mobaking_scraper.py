from pytrends.pyGTrends import pyGTrends
import time
import os, sys
from random import randint

google_username = 'pytrends@gmail.com'
google_password = 'datascience'
path = "/Users/Sawan/Desktop/pytrends-master/examples/"

# connect to Google
connector = pyGTrends(google_username, google_password)

# make request
files = ["lol", "dota 2", "hon", "hos", "ic", "mww", "overwatch", "smite", "strife"]

for fi in files:
	if not os.path.exists(path+fi):
		os.makedirs(path+fi)
	with open(fi+".txt") as f:
		for line in f:
			keyword = line.rstrip('\n')
			year = 2014
			if not os.path.exists(path+fi+"/"+keyword):
				os.makedirs(path+fi+"/"+keyword)
			for y in range(1,3):
				month = 1
				for x in range(1,7):
					connector.request_report(keyword,"","","", str(month)+"/"+str(year)+" 2m")
					# wait a random amount of time between requests to avoid bot detection
					time.sleep(randint(5, 10))
					# download file
					connector.save_csv(path+fi+"/"+keyword+"/", keyword+str(year)+str(x))
					month = month + 2
				year = year + 1