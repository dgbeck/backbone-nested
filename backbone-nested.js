(function(Backbone, View) {

  Backbone.View = View.extend({
    
    // Adds a subview to the current view, which will
    // ensure its removal when this view is removed,
    // or when view.removeSubviews is called
    addSubview: function(view, key) {
      if (!(view instanceof View)) {
        throw new Error("Subview must be a Backbone.View");  
      }
      if (_.isUndefined(key)) key = _.size(this.subviews);
      (this.subviews || (this.subviews = {}))[key] = (view);
      return view;
    },
    
    // Removes any subviews associated with this view
    // by `addSubview`, which will in-turn remove any
    // children of those views, and so on.
    removeSubviews: function() {
      var children = this.subviews;
      if (!children) return this;
      _.each(children, function(child) {
        child.remove();
      });
      delete this.subviews;
      return this;
    },

    // Extends the view's remove, by calling `removeSubviews`
    // if any subviews exist.
    remove: function() {
      if (this.subviews) this.removeSubviews();
      return View.prototype.remove.apply(this, arguments);
    }
  });

})(this.Backbone, this.Backbone.View);
