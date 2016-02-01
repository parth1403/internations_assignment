# crossover assignment - Parth Suthar - pvs1403@gmail.com

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## prerequisite

1. install node.js - https://nodejs.org/en/download/
2. install yeoman - http://yeoman.io/codelab/setup.html
3. install git - https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
5. clone git repository https://github.com/parth1403/internations_assignment.git
    OR
   - extract uploaded zip.
   - copy assignment folder to any directory
   - do setup.

## Build & development
1. go to application directory via terminal or command prompt.
2. run "npm cache clean"
3. run "npm install phantomjs"
4. run "npm install karma"
5. run "npm install jasmine-core"
6. run "npm install"
7. run "bower install"
8. run "grunt serve" for application preview

## assignment is hosted at http://myfuncode.com/internations/

Note: If you get any error while running "npm install", try "sudo npm install" or on windows machine with administrative priviledges.

## backend apis to be required in future.

App is designed to be work with RESTful apis.

1. user apis
  - GET   :: "/users"
    - Returns list of users.
    - Will be used by "Users list" page.
  - POST  :: "/users"
    - Add submitted user details
    - Will be used by "Add User" page.
  - PUT   :: "/users/:id"
    - Modify submitted user details to passed id.
    - Will be used by "Edit User" page.
  - DELETE :: "/users/:id"
    - Delete user having id equals to passed id.
    - Will be used by "Users list" page.

2. group apis
  - GET   :: "/groups"
    - Returns list of users.
    - Will be used by "Groups list" page.
  - POST  :: "/groups"
    - Add submitted user details
    - Will be used by "Add Group" page.
  - PUT   :: "/groups/:id"
    - Modify submitted user details to passed id.
    - Will be used by "Edit Group" page.
  - DELETE :: "/groups/:id"
    - Delete user having id equals to passed id.
    - Will be used by "Groups list" page.

3. Groupuser apis
  - GET   :: "/groupusers"
    - Return list of group containing users list.
    - Will be used by "User Details" & "Group Details" page.
  - PUT   :: "/groupusers/:group_id"
    - Modify users in passed group_id.
    - Will be used by "Add User", "Edit User", "User Details","Group Details" page.

