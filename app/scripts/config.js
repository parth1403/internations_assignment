/**
 * Created by PARTH on 22/03/2015.
 */

define([

], function () {
var Configuration = {
    useLocalData: true,
    environment: 'local',
    services: {
        local:{
            users: 'localdata/users.json',
            groups: 'localdata/groups.json',
            groupusers: 'localdata/groupusers.json'
        },
        production: {
            users: '/users',
            groups: '/groups',
            groupusers: '/groupusers'
        }
    }
}
  return Configuration;
});

