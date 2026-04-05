app.get('/api/products', (req, res) => {
    res.json([
      { id: 1, name: 'Dress' },
      { id: 2, name: 'Shoes' }
    ]);
  });