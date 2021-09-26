# Generate Users Access Tokens
**Script:** getuserdata.js

`node getuserdata.js`

This will generate accessToken for all users in _./data/userdata.csv_
and store in _./data/userdata-token.csv_ to be used in the tests

# Test Scenarios
## 1. Current Production Behaviour
**Script name:** chat-prod-baseline.yaml

**Steps:**
1. Ramp Up: 600k CCUs in 30 mins
2. Steady-state: 600k CCUs for 90 mins
3. Ramp Down: to 0 in 10 mins


## 2. 2X Step Stress Test
**Script name:** chat-prod-baseline.yaml

**Steps:**
1. Ramp Up: 600k CCUs in 30 mins
2. Steady-state: 600k CCUs for 90 mins
3. Ramp Up: Another 600k CCUs in 30 mins
3. Ramp Down: to 0 in 20 mins
