var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('../db/voterdb.sqlite');

const createPollTableSql = `
  CREATE TABLE poll(
    poll_id integer PRIMARY KEY AUTOINCREMENT,
    name text NOT NULL,
    image_url text NOT NULL,
    author text NOT NULL,
    is_open iteger NOT NULL
  )`;
  
  const examplePolls = [
    ['Where we should organize integration trip?', '/static/media/10.2ec34c0f.jpg', 'MarcinŚ', 1],
    ['What for lunch?', '/static/media/10.2ec34c0f.jpg', 'JanT', 1],
    ['Whats blocker of the week?', '/static/media/7.8b0b01db.jpg', 'JanT', 0]
  ];

const createProposalTableSql = `
  CREATE TABLE proposal(
    proposal_id integer PRIMARY KEY AUTOINCREMENT,
    name text NOT NULL,
    votes iteger NOT NULL,
    poll_id integer NOT NULL,
    FOREIGN KEY (poll_id) REFERENCES poll (poll_id)
  )`;

  const exampleProposal = [
    ['Berlin', 2,1],
    ['Cracow', 20,1],
    ['London', 32,1],
    ['Mad Mick', 666,2],
    ['MacDonald', 0,2],
    ['Subway', 2,2],
    ['Company budget without sign off', 43,3],
    ['Missing coffe', 200,3]
  ];

  const createUserTableSql = `
  CREATE TABLE user(
    user_id integer PRIMARY KEY AUTOINCREMENT,
    username text NOT NULL,
    password text NOT NULL,
    is_admin integer NOT NULL DEFAULT 0
  )`;

  const exampleUsers = [
    ['MarcinŚ', '$2a$08$yT5LQT8Nw3FiCXib4lvn9OIqLB/rDHFxIhRjpd7zIBLIoy9qoCV8q'],
    ['MichałJ', '$2a$08$yT5LQT8Nw3FiCXib4lvn9OIqLB/rDHFxIhRjpd7zIBLIoy9qoCV8q'],
  ];

  const createVoteTableSql = `
  CREATE TABLE vote(
    user_id integer NOT NULL,
    proposal_id integer NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (user_id),
    FOREIGN KEY (proposal_id) REFERENCES proposal (proposal_id),
    UNIQUE( user_id, proposal_id)
  )`;

  const exampleVotes = [
    [1,1],
    [2,2],
  ];


  function addExamplePolls(db) {
    let addPollStmt = db.prepare('INSERT INTO poll (name, image_url, author, is_open) VALUES (?, ?, ?, ?)');

    examplePolls.forEach(pollRow => {
      addPollStmt.run(...pollRow);
    });

    addPollStmt.finalize()
  }

  function addExampleProposals(db) {
    let addProposalStmt = db.prepare('INSERT INTO proposal (name, votes, poll_id) VALUES (?, ?, ?)');

    exampleProposal.forEach(proposalRow => {
      addProposalStmt.run(...proposalRow);
    });

    addProposalStmt.finalize()
  }

  function addExampleUsers(db) {
    let addUserStmt = db.prepare('INSERT INTO user (username, password) VALUES (?, ?)');

    exampleUsers.forEach(userRow => {
      addUserStmt.run(...userRow);
    });

    addUserStmt.finalize()
  }

  function addExampleVotes(db) {
    let addViteStmt = db.prepare('INSERT INTO vote (user_id, proposal_id) VALUES (?, ?)');

    exampleVotes.forEach(voteRow => {
      addViteStmt.run(...voteRow);
    });

    addViteStmt.finalize()
  }

  db.serialize(function () {
      db.run(createPollTableSql)
      db.run(createProposalTableSql)
      db.run(createUserTableSql)
      db.run(createVoteTableSql)
      addExamplePolls(db)
      addExampleProposals(db)
      addExampleUsers(db)
      addExampleVotes(db)
  })
  
  db.close()

  console.log('db/tables created and example data imported ');