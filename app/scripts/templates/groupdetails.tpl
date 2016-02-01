<div class="group-details container blue">
  <div class="title">User Details</div>
  <div class="container-body no-padding">
    <div class="msg-container">

    </div>
    <div class="input-row">
      <div class="label">Name</div>
      <div class="field-value"><%= name %></div>
      <div class="clearfix"></div>
    </div>
    <div class="input-row groups-row">
      <div class="label">Users</div>
      <div class="field-value">
      <select id="groups-users" name="groups-users">
          <% _.each(users, function(user) { %>
            <option value="<%= user.user_id %>" <%= groupusers.indexOf(user.user_id) >= 0 ? "selected": "" %>><%= user.name %></option>
          <% }); %>
      </select>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="form-actions">
      <input type="button" id="save" class="btn btn-circle blue" value="Save" />
      <input type="button" id="delete" class="btn btn-circle red" value="Delete" />
    </div>
  </div>
</div>
