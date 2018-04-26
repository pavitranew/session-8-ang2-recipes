    class MovieCollection extends Array {
      constructor(name, ...items) {
        super(...items);
        // this.name = name;
      }
    //   add(movie) {
    //     this.push(movie);
    //   }
    //   topRated(limit = 10) {
    //     return this.sort( function(firstItem, secondItem) {
    //       if (firstItem.stars > firstItem.stars){
    //         return 1
    //       } else {
    //         return -1;
    //       }
    //     }).slice(0, limit);
    //   }
    }

    interface MovieCollection {
        // name: string;
        // make: string;
    }

    const movies = new MovieCollection(
      'My Favorite Movies',
      { name: 'Sausage Party', stars: 10 },
      { name: 'Star Wars Trek', stars: 1 },
      { name: 'Virgin Suicides', stars: 7 },
      { name: 'Alice in the Cities', stars: 8 }
    );

    // movies.add({ name: 'Titanic', stars: 5 });

    document.body.innerHTML = `movies.topRated()`