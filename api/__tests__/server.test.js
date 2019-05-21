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
      console.log('ONE')
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
        console.log('TWO')
        return login.expect(201);
      })

      it('should return an object', () => {
        console.log('THREE')
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
        console.log('FOUR')
        return register.expect(201);
      })

      it('should return an object', () => {
        console.log('FIVE')
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
        console.log('SIX')
        return orgs.expect(200);
      })

      it('should return an array', () => {
        console.log('SEVEN')
        return orgs.then(res => {
            expect(Array.isArray(res.body));
          });
      })
    })

    describe('/roles GET', () => {
      const roles = request(server)
        .get('/public/roles');

      it('should return status 200', () => {
        console.log('EIGHT')
        return roles.expect(200);
      })

      it('should return an array', () => {
        console.log('NINE')
        return roles.then(res => {
            expect(Array.isArray(res.body));
          });
      })
    })

    describe('/issue-status GET', () => {
      const issue_status = request(server)
        .get('/public/issue-status');

      it('should return status 200', () => {
        console.log('TEN')
        return issue_status.expect(200);
      })

      it('should return an array', () => {
        console.log('ELEVEN')
        return issue_status.then(res => {
            expect(Array.isArray(res.body));
          });
      })
    })
  })

  describe('/issues', () => {
    const login = username => ({
      "username": username,
      "password": "password"
    })
    
    const user1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InVzZXIxIiwib3JnX3JvbGVzIjpbeyJvcmdfaWQiOjEsIm9yZ19uYW1lIjoiT3JnYW5pemF0aW9uIE9uZSIsInJvbGVzIjpbeyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJTY2hvb2wgQWRtaW5pc3RyYXRvciJ9XX1dLCJpYXQiOjE1NTg0NzY5NjZ9.y4tdBXUO6YZajW7tIcd_d1ioRLe2DXiO8nDqEXzvZho';
    
    // const user3 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjozLCJ1c2VybmFtZSI6InVzZXIzIiwib3JnX3JvbGVzIjpbeyJvcmdfaWQiOjIsIm9yZ19uYW1lIjoiT3JnYW5pemF0aW9uIFR3byIsInJvbGVzIjpbeyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJTY2hvb2wgQWRtaW5pc3RyYXRvciJ9XX1dLCJpYXQiOjE1NTg0NzcwMjR9.CXTFYfZIiqvgUu0XpvsQd015ew6Qwa1_IojfwbOH_4U';

    describe('/ GET', () => {
      const getIssues = request(server)
        .get('/issues')
        .set({ Authorization: user1 });

      it('should return status 200', () => {
        console.log('TWELVE')
        return getIssues.expect(200);
      })

      it('should return an array', () => {
        console.log('THIRTEEN')
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
        // console.log('FOURTEEN')
      // })
    // })

    describe('/:id GET', () => {
      const getIssueRtID = request(server)
        .get('/issues/1')
        .set({ Authorization: user1 });

      it('should return status 200', () => {
        console.log('FIFTEEN')
        return getIssueRtID.expect(200);
      })

      it('should return an object', () => {
        console.log('SIXTEEN')
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
        .set({ Authorization: user1 });

      it('should return status 200', () => {
        return getIssuesRtOrgID.expect(200);
      })

      it('should return an object', () => {
        return getIssuesRtOrgID.then(res => {
          expect(Array.isArray(res.body));
        });
      })
    })
  })
})
