(function (seedData){
  seedData.initialNotes = [{
      name: 'Notebook 1',
      notes: [{
        note: 'notebook 1 note 1',
        author: 'author 1',
        color: 'yellow'
      },{
        note: 'notebook 1 note 2',
        author: 'author 1',
        color: 'blue'
      }, {
        note: 'notebook 1 note 2',
        author: 'author 2',
        color: 'yellow'
      }]
    }, {
    name: 'Notebook 2',
      notes: [{
        note: 'notebook 2 note 1',
        author: 'author 3',
        color: 'red'
      },{
        note: 'notebook 2 note 2',
        author: 'author 1',
        color: 'orange'
      }]
    }
  ];
})(module.exports);
