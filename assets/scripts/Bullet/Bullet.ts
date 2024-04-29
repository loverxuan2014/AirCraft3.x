import { _decorator, Component, Node, resources, SpriteFrame, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    @property
    BulletMoveSpeed: number = 500;
    BulletDamage: number = 1;
    //start() {}

    update(deltaTime: number) {
        let newX: number = this.node.position.x;
        let newY: number = this.node.position.y + this.BulletMoveSpeed * deltaTime;
        let newZ: number = this.node.position.z;
        this.node.setPosition(newX, newY, newZ);
        if(newY > 720){
            this.node?.destroy();
        }
    }

    bulletDie(){
        this.BulletMoveSpeed = 0;
        resources.load(
            "Images/Img/wsparticle_11/spriteFrame",
            SpriteFrame,
            (err: Error, res: SpriteFrame) => {
                if (err) {
                    return console.error("load SpriteFrame failed:" + err);
                }
                this.node.getComponent(Sprite).spriteFrame  = res;
            });
        //???????????????
        setTimeout(() => {
            this.node?.destroy();
        }, 150);
    }
}


