const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    prefab: cc.Prefab = null
    @property(cc.Node)
    item: cc.Node = null

    onLoad () {
        // this.node.removeChild(this.node.getChildByName('begin_item'))
        this.node.addChild(cc.instantiate(this.prefab))
        this.node.addChild(cc.instantiate(this.prefab))
        this.node.addChild(cc.instantiate(this.prefab))
        this.node.addChild(cc.instantiate(this.prefab))
    }

    start () {

    }

    // update (dt) {}
}
