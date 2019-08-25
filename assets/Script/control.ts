const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    prefab: cc.Prefab = null
    @property(Number)
    speed: number = 1
	
    item: cc.Node[] = []

    onLoad () {
        for(let i=0; i<7; i++) {
            if(this.prefab) {
                this.item.push(cc.instantiate(this.prefab))
                this.item[i].y = -870 + 432*i
                this.node.addChild(this.item[i])
            }
        }     
    }

    click () {
        console.error('log')
    }

    moveDown() {
        return new Promise((resolve) => {
            for(let i=0; i<7; i++) {
                let index = i
                this.item[i].runAction(cc.sequence(cc.moveTo(this.speed,0,this.item[i].y - 432), cc.callFunc(() => {
                    if (index == 6) {
                        let downNode = this.item.shift()
                        downNode.y = 1290 + 432
                        this.item.push(downNode)
                        resolve()
                    }
                })))
            }
        })
    }

    async up() {
        while(true) {
            await this.moveDown()  
        }  
    }

    start () {
        this.up()
    }

    // update (dt) {

    }
}
