import csv
import matplotlib.pyplot as plt
import numpy as np
from collections import defaultdict

#{0: 'ID', 1: 'GMI', 2: 'CCP', 3: 'CP', 4: 'SLP', 5: 'AV', 6: 'DP', 7: 'LA', 8: 'MMP', 9: 'CS'}
factors = {'ID': [], 'GMI': [], 'CCP': [], 'CP': [], 'SLP': [], 'AV': [], 'DP': [], 'LA': [], 'MMP': [], 'CS': []} 

def judgeDTI(row):
    # calculate DTI
    ID = int(row[0])
    GMI = row[1]
    CCP = row[2]
    CP = row[3]
    SLP = row[4]
    MMP = row[8]
    DTI = (CCP + CP + SLP + MMP) / GMI
    FEDTI = MMP / GMI 

    # if DTI too high, then increment related factors
    if DTI > 0.43:
        factors['CCP'].append(ID)
        factors['GMI'].append(ID)
        factors['CP'].append(ID)
        factors['SLP'].append(ID)
        factors['MMP'].append(ID)
    elif FEDTI > 0.28: 
        factors['MMP'].append(ID)
    
def judgeLTV(row):
    ID = int(row[0])
    AV = row[5]
    DP = row[6]
    LA = row[7]
    LTV = LA / AV
    if LTV > 0.8:
        factors['DP'].append(ID)
    
    #LTV = loan amount / appraisal value 
def judgeCredit(row):
    # extract and view credit score
    ID = int(row[0])
    if row[9] < 640:
        factors['CS'].append(ID)
        
def criteria(row):
    res = []

    judgeDTI(row)
    judgeCredit(row)
    judgeLTV(row)
    # list of reasons for failure
    return res


with open('data.csv', 'r') as csv_file:
    csv_reader = csv.reader(csv_file)
    header = next(csv_reader)
    for row in csv_reader:
        formattedRow = [float(x) for x in row]
        ID = int(row[0])

        # check all reasons
        failures = criteria(formattedRow)

        # always append id to factors['ID']
        factors['ID'].append(ID)

        # append to factors['reason'] if check fails
        for factor in failures:
            factors[factor].append(ID)

print(factors)

###
### PLOTTING
###

numOfClients = len(factors['ID'])
factorsList = list(factors.keys())

x = np.arange(len(factors) - 1)
width = 0.25
multiplier = 0

fig, ax = plt.subplots(layout='constrained')
    
results = {'Y': [], 'N': []}

for factor in factorsList[1:]:
    results['N'].append(len(factors[factor]) / numOfClients * 100)
    results['Y'].append(100 - results['N'])

for attribute, measurement in results.items():
    offset = width * multiplier
    rects = ax.bar(x + offset, measurement, width, label=attribute)
    ax.bar_label(rects, padding=3)
    multiplier += 1

# Add some text for labels, title and custom x-axis tick labels, etc.
ax.set_ylabel('Percentage')
ax.set_title('Y/N for each factor')
ax.set_xticks(x + width, factorsList)
ax.legend(loc='upper left', ncols=2)
ax.set_ylim(0, 250)

plt.show()