import time
def Combinations(L, k):
    """List all combinations: choose k elements from list L"""
    n = len(L)
    result = [] # To Place Combination result
    for i in range(n-k+1):
        if k > 1:
            newL = L[i+1:]
            Comb, _ = Combinations(newL, k - 1)
            for item in Comb:
                item.insert(0, L[i])
                result.append(item)
        else:
            result.append([L[i]])
    return result, len(result)
 
if __name__ == '__main__':
    start = time.time()
    result, number = Combinations(range(48), 4)
    end = time.time()
    print(end - start)
    print(number)