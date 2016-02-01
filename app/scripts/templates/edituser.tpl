<div class="edit-user-form-container container blue">
  <div class="title"><%= user_id ? 'Edit User' : 'Add User' %></div>
  <div class="container-body no-padding">
    <form id="edit-user-form" validate>
      <div class="form-body">
        <div class="msg-container">

        </div>
        <input type="hidden" id="user-id" name="user-id" value="<%= user_id %>" />
        <div class="input-row">
          <div class="label">Name</div>
          <div class="control-container">
            <div class="input"><input type="text" class="form-control input-circle" id="name" name="name" value="<%= name %>" /></div>
            <div class="error" id="name-error"></div>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="input-row">
          <div class="label">Gender</div>
          <div class="control-container">
            <div class="input">
              <input type="radio" id="male_gender" name="gender" checked value="male" /><label for="male_gender">Male</label>
              <input type="radio" id="female_gender" name="gender" <%= gender == "female" ? "checked" : "" %> value="female" /><label for="female_gender">Female</label>
            </div>
            <div class="error" id="gender-error"></div>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="input-row">
          <div class="label">Birth Date</div>
          <div class="control-container">
            <div class="input"><input type="date" class="form-control input-circle" id="bdate" name="bdate" value="<%= bdate %>" /></div>
            <div class="error" id="bdate-error"></div>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="input-row groups-row">
          <div class="label">Groups</div>
          <div class="control-container">
            <div class="input">
              <select id="user-groups" name="user-groups">
                  <% _.each(groups, function(group) { %>
                    <option value="<%= group.group_id %>" <%= usergroups.indexOf(group.group_id) >= 0 ? "selected": "" %>><%= group.name %></option>
                  <% }); %>
              </select>
            </div>
            <div class="error" id="group-error"></div>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
      <div class="form-actions">
        <input type="submit" id="submit" name="submit" class="btn btn-circle blue" value="Submit" />
      </div>
    </form>
  </div>
</div>
