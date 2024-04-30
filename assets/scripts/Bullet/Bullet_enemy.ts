import { _decorator, Component, Node, resources, SpriteFrame, Sprite, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet_enemy')
export class Bullet_enemy extends Component {
    BulletMoveSpeed: number = 500;
    BulletDamage: number = 1;

    update(deltaTime: number) {
        console.log("boss shooting");
        let newX: number = this.node.position.x;
        let newY: number = this.node.position.y - this.BulletMoveSpeed * deltaTime;
        let newZ: number = this.node.position.z;
        this.node.setPosition(newX, newY, newZ);

        if(newY < -1500){
            setTimeout(() => {
                this.node?.destroy();
            }, 300);
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


