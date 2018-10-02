module.exports = function count(s, pairs) {
    var N = 1,
        mul = 1,
        result = 0;
    var mod = 1000000007;

    if (s == '1') return getPrimes();

    for (var i = 0; i < pairs.length; i++) {
        N *= pairs[i][0];
        mul *= binPow(pairs[i][0], pairs[i][1] - 1);
        mul %= mod;
    }

    if (N > 1000000) return result;

    loop1: for (var i = 0; i < N; i++) {
        loop2: for (var j = 0; j < s.length; j++) {
            for (var k = 0; k < pairs.length; k++) {
                if (s[j] == '0') {
                    if ((i + j) % pairs[k][0] == 0) continue loop2;
                    else if (k == (pairs.length - 1)) continue loop1;
                } else {
                    if ((i + j) % pairs[k][0] == 0) continue loop1;
                }
            }
        }
        result++;
    }

    return (result * mul) % mod;


    function binPow(num, pow) {
        if (pow == 0) return 1;
        else if (pow == 1) return num;

        if (pow % 2 == 0) {
            var temp = binPow(num, pow / 2);
            return temp * temp % mod;
        } else {
            return binPow(num, pow - 1) * num % mod;
        }
    }

    function getPrimes() {
        var result = 1;
        for (var i = 0; i < pairs.length; i++) {
            result *= (Math.pow(pairs[i][0], pairs[i][1]) - Math.pow(pairs[i][0], pairs[i][1] - 1));
            result = result % mod;
        }
        return result;
    }
}
