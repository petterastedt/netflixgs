export default {

  async getLocalResults(query, dbCountry) {
    const results = await fetch('http://localhost:5000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            searchString: query,
            country: dbCountry
        })
    }) 
    const json = await results.json() 
    return json
  },

  async updateItem(query) {
    const updateItemDb = await fetch(`http://localhost:5000/items/${query._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query
      })
    }) 
    const json = await updateItemDb.json()
    return json
  } 
} 