import { _decorator, Component, Node, resources, SpriteFrame, Sprite } from 'cc';
import { Map } from '../Map/Map';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    //配置属性
    enemyMoveSpeed: number = 200;
    
    update(deltaTime: number){
        let newX: number = this.node.position.x;
        let newY: number = this.node.position.y - this.enemyMoveSpeed * deltaTime;
        let newZ: number = this.node.position.z;
        this.node.setPosition(newX, newY, newZ);
    }

    enemyDie(){
        this.enemyMoveSpeed = 0;
        resources.load(
            "Images/Img/planeDestory/spriteFrame",
            SpriteFrame,
            (err: Error, res: SpriteFrame) => {
                if (err) {
                    return console.error("load SpriteFrame failed:" + err);
                }
                this.node.getComponent(Sprite).spriteFrame  = res;
            });
        //一定要给延时，逻辑执行完再销毁
        setTimeout(() => {
            this.node?.destroy();
        }, 200);
    }
}