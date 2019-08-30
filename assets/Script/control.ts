const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    prefab: cc.Prefab = null
    @property(Number)
    speed: number = 0.1

    item: cc.Node[] = []

    onLoad() {
        for (let i = 0; i < 7; i++) {
            if (this.prefab) {
                this.item.push(cc.instantiate(this.prefab))
                this.item[i].y = -870 + 432 * i
                this.randomColor(this.item[i])
                this.node.addChild(this.item[i])
            }
        }
        this.bindEvent()
    }

    bindEvent() {
        for (let i = 0; i < 7; i++) {
            this.bindBtn(this.item[i], 'left_btn', i)
            this.bindBtn(this.item[i], 'c_left_btn', i)
            this.bindBtn(this.item[i], 'c_right_btn', i)
            this.bindBtn(this.item[i], 'right_btn', i)
        }
    }

    bindBtn(node: cc.Node, name: string, index: number) {
        let event = new cc.Component.EventHandler();
        event.target = this.node
        event.component = "control"
        event.handler = "click"
        event.customEventData = index + '&' + name
        node.getChildByName(name).getComponent(cc.Button).clickEvents[0] = event
    }

    async click(e, tag) {
        let [idnex, btn] = tag.split('&')
        if (idnex == '0') {
            let color = this.item[0].getChildByName(btn).getComponent(cc.Button).normalColor 
            if(color.equals(cc.color(225, 225, 225, 200))){
                await this.moveDown()
            }    
        } else {
            
        }
    }

    randomColor(node: cc.Node) {
        node.getChildByName('left_btn').getComponent(cc.Button).normalColor = cc.color(230, 230, 230, 30)
        node.getChildByName('c_left_btn').getComponent(cc.Button).normalColor = cc.color(230, 230, 230, 30)
        node.getChildByName('c_right_btn').getComponent(cc.Button).normalColor = cc.color(230, 230, 230, 30)
        node.getChildByName('right_btn').getComponent(cc.Button).normalColor = cc.color(230, 230, 230, 30)
        let rand = Math.floor(Math.random() * 10 % 4)
        if (rand == 0) {
            node.getChildByName('left_btn').getComponent(cc.Button).normalColor = cc.color(225, 225, 225, 200)
        } else if (rand == 1) {
            node.getChildByName('c_left_btn').getComponent(cc.Button).normalColor = cc.color(225, 225, 225, 200)
        } else if (rand == 2) {
            node.getChildByName('c_right_btn').getComponent(cc.Button).normalColor = cc.color(225, 225, 225, 200)
        } else {
            node.getChildByName('right_btn').getComponent(cc.Button).normalColor = cc.color(225, 225, 225, 200)
        }
    }

    moveDown() {
        return new Promise((resolve) => {
            for (let i = 0; i < 7; i++) {
                let index = i
                this.item[i].runAction(cc.sequence(cc.moveTo(this.speed, 0, this.item[i].y - 432), cc.callFunc(() => {
                    if (index == 6) {
                        let downNode = this.item.shift()
                        downNode.y = 1290 + 432
                        this.randomColor(downNode)
                        this.item.push(downNode)
                        this.bindEvent()
                        resolve()
                    }
                })))
            }
        })
    }

    start() {

    }

    // update (dt) {

}
