import { _decorator, Component, Node, UITransform, resources, SpriteFrame, Sprite } from 'cc';
import { Player } from './Player';
import { Bullet } from '../Bullet/Bullet';
const { ccclass, property } = _decorator;

@ccclass('Boss')
export class Boss extends Component {
//配置属性
bossMoveSpeedY: number = 100;
bossMoveSpeedX: number = 100;
boss_HP: number = 30;
uiTransform: UITransform = null;
otherNode1: Node = null;
bossID = null;

start(){
    this.otherNode1 = this.node.parent.getChildByName("planeNormal_2");
    this.uiTransform = this.node.getComponent(UITransform);
    this.uiTransform.anchorY = 1;
}

update(deltaTime: number){
    let newX: number = this.node.position.x;
    let newY: number = this.node.position.y - this.bossMoveSpeedY * deltaTime;
    let newZ: number = this.node.position.z;
    this.node.setPosition(newX, newY, newZ);
    //当Y小于200，Y轴速度为0，X轴速度不为0，在X轴随机范围内移动
    
    if(this.otherNode1.getComponent(Player).dieState == true){
        this.bossMoveSpeedY = 0;
        this.bossMoveSpeedX = 0;
    }
    else{
        this.bossMoveSpeedY = 100;
        this.bossMoveSpeedX = 100;
    }
}

bossDie(){
    this.boss_HP -= this.node.parent.getChildByName("img_bullet_01").getComponent(Bullet).BulletDamage;
    if(this.boss_HP == 0){
        this.bossMoveSpeedY = 0;
        this.bossMoveSpeedX = 0;
        this.otherNode1.getComponent(Player).KillScore += 70;
        let bossDiePic: string = null;
        switch(this.bossID){
            case 1: bossDiePic = "Images/Img/bossDestory_01/spriteFrame";
            case 2: bossDiePic = "Images/Img/bossDestory_02/spriteFrame";
            case 3: bossDiePic = "Images/Img/bossDestory_03/spriteFrame";
            case 4: bossDiePic = "Images/Img/bossDestory_04/spriteFrame";
            case 5: bossDiePic = "Images/Img/bossDestory_05/spriteFrame";
        }
        resources.load(
            bossDiePic,
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
}


