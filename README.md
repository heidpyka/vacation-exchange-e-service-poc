# Vacation Exchange E-service PoC
This application is a PoC of an e-service for vacation exchange management using LDAP directory for authentication and MongoDB as the application database. In this PoC, the LDAP directory was simulated using OpenDJ Community Edition 2.6.4. The MongoDB database used was MongoDB Atlas.

### Running the PoC in development mode
1. Clone repo.
2. Make sure `yarn` and Node.js are installed.
3. Run `npm install`.
4. Run `npm run dev`.
5. Go to `http://localhost:3000` to use application front-end.

### Settings
Attributes in .env-file need to be configured:
* `DB` is to be set to the MongoBD collection URL.
* `LDAP_URL` is to be set to the LDAP directory URL.
* `LDAP_BIND_DN` is to be set to the bind DN of the LDAP directory.
* `LDAP_SEARCH_BASE` is to be set to the base of the LDAP directory tree.
