const request = require('supertest');
const server = require('../server.js');

const knex = require('../../data/dbConfig');

describe('test environment', () => {
  it("sets DB_ENV to 'test'", () => {
    expect(process.env.DB_ENV).toBe('test');
  })
})

describe('server', () => {
  describe('/ GET', () => {
    it('should return 200 status', () => {
      return request(server)
        .get('/')
        .expect(200);
    })
  })

  beforeAll(async () => {
    jest.setTimeout(20000);
    await knex.seed.run();
  });

  afterEach(async () => {
    await knex.seed.run();
  });

  describe('/auth', () => {
    describe('/login POST', () => {
      const user = {
        "username": "user1",
        "password": "password"
      }
      
      const login = request(server)
        .post('/auth/login')
        .send(user);
      
      it('should return status 201', () => {
        return login.expect(201);
      })

      it('should return an object', () => {
        return login.then(res => {
            expect(res.body).toEqual(Object(res.body));
          });
      })
    })

    describe('/register POST', () => {
      const userData = {
        "username": "TEST",
        "password": "password",
        "name": "TEST",
        "role_id": "1",
        "org_id": "1"
      }

      const register = request(server)
        .post('/auth/register')
        .send(userData)

      it('should return status 201', () => {
        return register.expect(201);
      })

      it('should return an object', () => {
        return register.then(res => {
            expect(res.body).toEqual(Object(res.body));
          });
      })
    })
  })

  describe('/public', () => {
    describe('/orgs GET', () => {
      const orgs = request(server)
        .get('/public/orgs');
      
      it('should return status 200', () => {
        return orgs.expect(200);
      })

      it('should return an array', () => {
        return orgs.then(res => {
            expect(Array.isArray(res.body));
          });
      })
    })

    describe('/roles GET', () => {
      const roles = request(server)
        .get('/public/roles');

      it('should return status 200', () => {
        return roles.expect(200);
      })

      it('should return an array', () => {
        return roles.then(res => {
            expect(Array.isArray(res.body));
          });
      })
    })

    describe('/issue-status GET', () => {
      const issue_status = request(server)
        .get('/public/issue-status');

      it('should return status 200', () => {
        return issue_status.expect(200);
      })

      it('should return an array', () => {
        return issue_status.then(res => {
            expect(Array.isArray(res.body));
          });
      })
    })
  })

  describe('/issues', async () => {
    const login = username => ({
      "username": username,
      "password": "password"
    })
    
    const user1 = await request(server)
      .post('/auth/login')
      .send(login('user1'));
    
    // const user3 = await request(server)
    //   .post('/auth/login')
    //   .send(login('user3'));

    describe('/ GET', () => {
      const getIssues = request(server)
        .get('/issues')
        .set({ Authorization: user1.token });

      it('should return status 200', () => {
        return getIssues.expect(200);
      })

      it('should return an array', () => {
        return getIssues.then(res => {
          expect(Array.isArray(res.body));
        })
      })
    })

    // describe('/ POST', async () => {
      // const postIssue = await request(server)
      //   .post('/issues')
      //   .set(login(user1));
        
      // it('should return status 201', () => {
      // })
    // })

    describe('/:id GET', () => {
      const getIssueRtID = request(server)
        .get('/issues/1')
        .set({ Authorization: user1.token });

      it('should return status 200', () => {
        return getIssueRtID.expect(200);
      })

      it('should return an object', () => {
        return getIssueRtID.then(res => {
          expect(res.body).toEqual(Object(res.body));
        });
      })
    })

    describe('/:id PUT', () => {})

    describe('/:id DELETE', () => {})

    describe('/org/:org_id GET', () => {
      const getIssuesRtOrgID = request(server)
        .get('/issues/org/1')
        .set({ Authorization: user1.token });

      it('should return status 200', () => {
        return getIssuesRtOrgID.expect(200);
      })

      it('should return an object', () => {
        return getIssuesRtOrgID.then(res => {
          expect(Array.isArray(res.body));
        });
      })
    })

    describe('/org/:org_id POST', () => {})
  })
})
