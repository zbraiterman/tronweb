
class GetNowBlock {

    // constructor(tronWeb = false) {
    //     if (!tronWeb)
    //         throw new Error('Expected instance of TronWeb');
    //
    //     this.tronWeb = tronWeb;
    // }

    async someMethod(callback = false) {

        if(!callback)
            return this.injectPromise(this.getCurrentBlock);

        this.tronWeb.fullNode.request('wallet/getnowblock').then(block => {
            block.fromPlugin = true
            callback(null, block);
        }).catch(err => callback(err));
    }

    pluginInterface() {
        return {
            requires: '^2.2.2',
            components: {
                trx: {
                    // will be overridden
                    getCurrentBlock: this.someMethod,

                    // will be added
                    getLatestBlock: this.someMethod,

                    // will be skipped
                    _parseToken: function () {}


                }
            }
        }
    }
}

module.exports = GetNowBlock
