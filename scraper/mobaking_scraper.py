# -*- coding: utf-8 -*-
"""
mobaking_scraper.py

Created on Mon Dec 14 15:20:42 2015

@author: Sawan J. Kapai Harpalani
"""

import webbrowser
import time
import os
import shutil
import copy
import pandas as pd
import re
import csv
import numpy as np
from pandas import DataFrame
import sys

monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

def ScrapeTwoMonths(keyword, year, startMonth):
    print 'Scraping '+monthList[startMonth-1]+' and '+monthList[startMonth]+' in '+str(year)
    URL_start = "http://www.google.com/trends/trendsReport?&q="
    URL_end = "&cmpt=q&content=1&export=1"
  
    queries = keyword[0]
    if len(keyword) > 1:
        queries_list = []
        for i in range(0,len(keyword)):
            queries_list.append(keyword[i])
        queries = '%20'.join(queries_list)
        
    date = '&date='+str(startMonth)+'%2F'+str(year)+'%202m'
    
    URL = URL_start+queries+date+URL_end

    webbrowser.open(URL)   

def ScrapeRange(keyword, startMonth, startYear, endMonth, endYear):
            
    for i in range(startMonth,13,2):
        ScrapeTwoMonths(keyword,startYear,i)
        time.sleep(7)
    for y in range(startYear + 1, endYear):
        for i in range(1,11,2):
            ScrapeTwoMonths(keyword,y,i)
            time.sleep(7)
    for i in range(1,endMonth,2):
        ScrapeTwoMonths(keyword,endYear,i)
        time.sleep(7)
    
    files = copy.deepcopy(os.listdir(path))    
    
    for i in range(0,len(files)):
        if files[i].lower().endswith('.csv'):
            try:
                if files[i][-5] == ")":
                    oldname = path+'/'+files[i]
                    no = oldname.split('(')[1].split(')')[0]
                    newname = path+'/report'+no+'.csv'
                    print newname
                    os.rename(oldname,newname)
            except OSError:
                pass

    quaterlyFiles = [fn for fn in os.listdir(path) if fn.lower().startswith('report')]
                                    
    for file in quaterlyFiles:
        shutil.move(path+"/"+file,path+'/'+scrapingDir)

    fullPath = path+'/'+scrapingDir    
    newFiles = copy.deepcopy(os.listdir(fullPath))

    for i in range(0,len(newFiles)):
        oldname = fullPath+'/'+newFiles[i]
        if os.path.getsize(oldname) < 800:
            print 'File '+oldname+' is unusually small...'
        newname = fullPath+'/'+str(os.path.getmtime(fullPath+'/'+newFiles[i]))[:-2]+".csv"
        os.rename(oldname, newname) 

def ScrapeRangeWeekly(keyword, startMonth, startYear, endMonth, endYear):
    months = 11-startMonth + (endYear - startYear - 1)*12 + endMonth
    print 'Scraping weekly data from '+month_list[startMonth-1]+' '+str(startYear)+' to '+month_list[endMonth-1]+' '+str(endYear)
    
    URL_start = "http://www.google.com/trends/trendsReport?&q="
    URL_end = "&cmpt=q&content=1&export=1"
    
    queries = keyword[0]
    if len(keyword) > 1:
        queries_list = []
        for i in range(0,len(keyword)):
            queries_list.append(keyword[i])
        queries = '%20'.join(queries_list)

    date = '&date='+str(startMonth)+'%2F'+str(startYear)+'%20'+str(months)+'m'
    
    URL = URL_start+queries+date+URL_end
    
    webbrowser.open(URL)

    time.sleep(7)
    
    oldname = path+'/'+'report.csv'
    newname = path+'/'+'weekly_data.csv'
    os.rename(oldname,newname)

    shutil.move(newname,path+'/'+scrapings_dir)

def CreateDailyFrame():

    files = copy.deepcopy(os.listdir(path+'/'+scrapings_dir))[:-1]

    date_pattern = re.compile('\d\d\d\d-\d\d-\d\d')
    for i in range(0,len(files)):
        if files[i].lower().endswith('.csv'):
            oldname = path+'/'+scrapings_dir+'/'+files[i]
            newname = path+'/'+scrapings_dir+'/'+'bimonthly'+str(i)+'.csv'
            temp_file = csv.reader(open(oldname,'ru'))
            with open(newname,'wb') as write_to:
                write_data = csv.writer(write_to, delimiter=',')
                for row in temp_file:
                    if len(row)==2:
                        if re.search(date_pattern,row[0]) is not None:
                            write_data.writerows([row])
            os.remove(oldname)

    files = [fn for fn in copy.deepcopy(os.listdir(path+'/'+scrapings_dir))[:-1] if fn.lower().startswith('bimonthly')]

    frames_list = []

    for file in files:
        df = pd.read_csv(path+'/'+scrapings_dir+'/'+file,index_col=None,header=None)
        frames_list.append(df)

    frame = pd.concat(frames_list,ignore_index=True)
    return frame

def CreateWeeklyFrame():

    date_pattern = re.compile('\d\d\d\d-\d\d-\d\d\s-\s\d\d\d\d-\d\d-\d\d')

    oldname = path+'/'+scrapings_dir+'/'+'weekly_data.csv'
    newname = path+'/'+scrapings_dir+'/'+'weekly.csv'
    temp_file = csv.reader(open(oldname,'ru'))
    with open(newname,'wb') as write_to:
        write_data = csv.writer(write_to, delimiter=',')
        for row in temp_file:
            if len(row) == 2:
                if re.search(date_pattern,row[0]) is not None:
                    write_data.writerows([row])
    os.remove(oldname)

    frame = pd.read_csv(newname,index_col=None,header=None)
    return frame

def StitchFrames():

    daily_frame = CreateDailyFrame()
    interim_weekly_frame = CreateWeeklyFrame()

    daily_frame.columns = ['Date', 'Daily_Volume']
    pd.to_datetime(daily_frame['Date'])
    
    interim_weekly_frame.columns = ['Date_Range', 'Weekly_Volume']
    date_pattern = re.compile('\d\d\d\d-\d\d-\d\d')

    startdates = []
    enddates = []

    for i in range(0,len(interim_weekly_frame['Date_Range'])):
        startdates.append(re.findall(date_pattern,interim_weekly_frame['Date_Range'][i])[0])
        enddates.append(re.findall(date_pattern,interim_weekly_frame['Date_Range'][i])[1])

    weekly_frame = pd.DataFrame(data=[startdates,enddates,interim_weekly_frame['Weekly_Volume'].tolist()]).transpose()
    weekly_frame.columns = ['Start_Date', 'End_Date', 'Weekly_Volume']
    pd.to_datetime(weekly_frame['Start_Date'])
    pd.to_datetime(weekly_frame['End_Date'])

    bins = []

    for i in range(0,len(weekly_frame)):
        bins.append(pd.date_range(weekly_frame['Start_Date'][i],periods=7,freq='d'))

    weekly_frame = weekly_frame.set_index('Start_Date')

    daily_frame = daily_frame.set_index('Date')

    final_data = {}

    for i in range(0,len(bins)):
        for j in range(0,len(bins[i])):
            final_data[bins[i][j]] = weekly_frame['Weekly_Volume'][str(bins[i][0].date())]*daily_frame['Daily_Volume'][str(bins[i][j].date())]/daily_frame['Daily_Volume'][str(bins[i][0].date())]

    final_data_frame = DataFrame.from_dict(final_data,orient='index').sort()
    final_data_frame[0] = np.round(final_data_frame[0]/final_data_frame[0].max()*100)

    final_data_frame.columns=['Volume']
    final_data_frame.index.names = ['Date']

    final_name = path+'/'+scrapings_dir+'/'+'final_output.csv'

    final_data_frame.to_csv(final_name, sep=',')

## run as python mobaking_scraper.py startMonth startYear endMonth endYear keyword_list

if __name__ == '__main__':

    print sys.argv[0]

    startMonth = sys.argv[1]
    startYear = sys.argv[2]
    endMonth = sys.argv[3]
    endYear = sys.argv[4]
    keywords = sys.argv[5:]

    path = '../data'

    scrapingsDir = 'keyword_{0}'.format(keywords[0])
    if not os.path.exists(path+"/"+scrapings_dir):
        os.makedirs(path+"/"+scrapings_dir)

    ScrapeRange(keywords, int(startMonth), int(startYear), int(endMonth), int(endYear))
    
    StitchFrames()