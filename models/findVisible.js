module.exports = function findVisible(populate){
    return function(next) {
        if(!this._conditions.ignoreVisiblity && typeof this._conditions.siVisible === 'undefined') {

            this.where('isVisible').equals(true);
        }
        delete this._conditions.ignoreVisiblity;
        if(populate){
            this.populate(populate);

        }
        next();
    }
}