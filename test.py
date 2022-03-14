


s = "cbbd"

checkLen = len(s)
maxLen = 0
while checkLen > 0:
    for i in range(len(s) - checkLen + 1):
        _slice = s[i:i+checkLen]
        if _slice == _slice[::-1]:
            print(s[i:checkLen])
    checkLen -= 1

print("end)")

