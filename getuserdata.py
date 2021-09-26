import requests
import csv
import sys


def getToken(userId, deviceId):
	header = {
		'x-api-key': 'kjsdkajdhkajhsdaksjdhaksjdhakjsdhq98w7eyq98we',
		'Content-Type': 'application/json'
	}

	data = { 
		"userId": userId, 
		"deviceId": deviceId,
		"deviceInfo": { "kind": "web", "model": "", "sdkVersion": "2.0" },
		"displayName": userId
	}

	endpoint = 'https://qatest.amity.co/v1/device'
	
	r = requests.post(url = endpoint, data = data, headers = header)
	return r.json()['token']


filename = './data/userdata.csv'
outputfile = './data/userdata-token.csv'

with open(filename, mode='r') as inputcsv, open(outputfile, mode='w') as outputcsv:
    csv_reader = csv.DictReader(inputcsv)

    alldata = []
    for row in csv_reader:
    	print("Getting token for " + row['userId'] + " - " + row['deviceId'])
    	row['token'] = getToken(row['userId'], row['deviceId'])
    	alldata.append(row)

    print("Writing output to " + outputfile)
    writer = csv.DictWriter(outputcsv, fieldnames = csv_reader.fieldnames)
    writer.writeheader()
    writer.writerows(alldata)
    