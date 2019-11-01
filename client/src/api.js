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
    let formatedQuery
    
    if (query.title.endsWith("A")) {
      formatedQuery = query.title.substring(0, query.title.length - 3).split(' ').join('+')
    } else if (query.title.endsWith("The")) {
      formatedQuery = query.title.substring(0, query.title.length - 5).split(' ').join('+')
    } else {
      formatedQuery = query.title.split(' ').join('+')
    }
    
    const updateItemDb = await fetch(`http://localhost:5000/items/${query._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query,
        formatedQuery: formatedQuery
      })
    }) 
    const json = await updateItemDb.json()
    return json
  } 
} 