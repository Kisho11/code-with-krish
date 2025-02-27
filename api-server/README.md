## Setup and Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kisho11/code-with-krish.git
   cd code-with-krish
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   node index.js
   ```

   The server will start on port 3000 by default.

## API Usage Examples

1. **Find Minimum Number**
   ```
   GET http://localhost:3000/number/min?num1=10&num2=5
   ```
   Response:
   ```json
   {
     "min": 5
   }
   ```

2. **Find Maximum Number**
   ```
   GET http://localhost:3000/number/max?numbers=5,10,3,99,2
   ```
   Response:
   ```json
   {
     "max": 99
   }
   ```

3. **Calculate Average**
   ```
   GET http://localhost:3000/number/avg?numbers=1,4,7,44,676
   ```
   Response:
   ```json
   {
     "average": 146.4
   }
   ```

4. **Sort Numbers**
   ```
   GET http://localhost:3000/number/sort?numbers=3,7,1,44,676&type=asc
   ```
   Response:
   ```json
   {
     "sorted": [1, 3, 7, 44, 676]
   }
   ```

5. **Count Occurrences**
   ```
   GET http://localhost:3000/number/count?numbers=1,saman,Kamal,676,1,saman&search=saman
   ```
   Response:
   ```json
   {
     "count": 2
   }
   ```

## References

1. ExpressJS Documentation: https://expressjs.com/en/guide/routing.html
2. Bubble Sort Algorithm: https://www.geeksforgeeks.org/bubble-sort-algorithm/
3. StackOverflow: Query Parameters in Express - https://stackoverflow.com/questions/6912584/how-to-get-get-query-string-variables-in-express-js-on-node-js