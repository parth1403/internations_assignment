<div class="edit-group-form-container container blue">
  <div class="title"><%= group_id ? 'Edit Group' : 'Add Group' %></div>
  <div class="container-body no-padding">
    <form id="edit-group-form" validate>
      <div class="form-body">
        <div class="msg-container">

        </div>
        <input type="hidden" id="group-id" name="group-id" value="<%= group_id %>" />
        <div class="input-row">
          <div class="label">Name :</div>
          <div class="control-container">
            <div class="input"><input type="text" id="name" class="form-control input-circle" name="name" value="<%= name %>" /></div>
            <div class="error" id="name-error"></div>
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
