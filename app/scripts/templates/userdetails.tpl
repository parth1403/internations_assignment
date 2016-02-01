<div class="user-details container blue">
  <div class="title">User Details</div>
  <div class="container-body no-padding">
    <div class="msg-container">

    </div>
    <div class="input-row">
      <div class="label">Name</div>
      <div class="field-value"><%= name %></div>
      <div class="clearfix"></div>
    </div>
    <div class="input-row">
      <div class="label">Gender</div>
      <div class="field-value"><%= gender %></div>
      <div class="clearfix"></div>
    </div>
    <div class="input-row">
      <div class="label">Birth Date</div>
      <div class="field-value"><%= bdate %></div>
      <div class="clearfix"></div>
    </div>
    <div class="input-row groups-row">
      <div class="label">Groups</div>
      <div class="field-value">
        <select id="user-groups" name="user-groups">
            <% _.each(groups, function(group) { %>
              <option value="<%= group.group_id %>" <%= usergroups.indexOf(group.group_id) >= 0 ? "selected": "" %>><%= group.name %></option>
            <% }); %>
        </select>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="form-actions">
      <input type="button" id="save" class="btn btn-circle blue" value="Save" />
    </div>
  </div>
</div>
