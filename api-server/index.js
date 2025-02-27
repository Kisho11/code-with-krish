const express = require('express');
const {
  getMinNumber,
  getMaxNumber,
  getAverage,
  sortNumbers,
  countOccurrences
} = require('./utils');

const app = new express();
const port = 3000;

app.get('/number/max', (req, res) => {
    const numbersInput = req.query.numbers;
    // checking the numbers list is provided or not
    if (!numbersInput) {
        return res.status(400).json({ error: 'numbers parameter is required' });
    }
    
    // iput comes as string, so we need split as string array and convert to number arr
    // parseFloat is used to convert string to number
    // map is used to convert each element of array to number
    const numbersArray = numbersInput.split(',').map(num => {
        const parsed = parseFloat(num);
        return parsed;
    });
    
    const result = getMaxNumber(numbersArray);
    res.status(result.status).json(result.data);
});

app.get('/number/avg', (req, res) => {
    const numbersInput = req.query.numbers;
    if (!numbersInput) {
        return res.status(400).json({ error: 'numbers parameter is required' });
    }
    
    // iput comes as string, so we need split as string array and convert to number arr
    // parseFloat is used to convert string to number
    // map is used to convert each element of array to number
    // map function can return the value to new array
    const numbersArray = numbersInput.split(',').map(num => {
        const parsed = parseFloat(num);
        return parsed;
    });
    
    const result = getAverage(numbersArray);
    res.status(result.status).json(result.data);
});

app.get('/number/sort', (req, res) => {
    const numbersInput = req.query.numbers;
    const sortType = req.query.type || 'asc'; // Default to ascending order
    
    if (!numbersInput) {
        return res.status(400).json({ error: 'numbers parameter is required' });
    }
    
    // iput comes as string, so we need split as string array and convert to number arr
    // parseFloat is used to convert string to number
    // map is used to convert each element of array to number
    // map function can return the value to new array
    const numbersArray = numbersInput.split(',').map(num => {
        const parsed = parseFloat(num);
        return parsed;
    });
    
    const result = sortNumbers(numbersArray, sortType);
    res.status(result.status).json(result.data);
});

app.get('/number/count', (req, res) => {
    const numbersInput = req.query.numbers;
    const searchValue = req.query.search;
    
    if (!numbersInput) {
        return res.status(400).json({ error: 'numbers parameter is required' });
    }
    
    if (searchValue === undefined) {
        return res.status(400).json({ error: 'search parameter is required' });
    }
    
    // Split comma-separated values into an array but don't convert to numbers
    // This allows searching for non-numeric values
    // split input string by comma and convert to array
    const array = numbersInput.split(',');
    
    // For count endpoint, we compare the exact values, so we pass the search value as is
    const result = countOccurrences(array, searchValue);
    res.status(result.status).json(result.data);
});

app.get('/number/min', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    const result = getMinNumber(num1, num2);
    res.status(result.status).json(result.data);
});

app.listen(port, () => {
    console.log(`API Server listening on port ${port}`);
});