import { _decorator, Component, Node, UITransform, resources, SpriteFrame, Sprite, instantiate, Prefab, v3 } from 'cc';
import { Player } from './Player';
import { Bullet } from '../Bullet/Bullet';
const { ccclass, property } = _decorator;

@ccclass('Boss')
export class Boss extends Component {
    @property(Prefab)
    skillBullet_01: Prefab = null;
    @property(Prefab)
    skillBullet_02: Prefab = null;
    @property(Prefab)
    skillBullet_03: Prefab = null;

    //配置属性
    bossMoveSpeedY: number = 100;
    bossMoveSpeedX: number = 80;
    boss_HP: number = 30;
    uiTransform: UITransform = null;
    otherNode1: Node = null;
    bossID: number = null;
    skillCd_01: number = 0.8;
    skillCd_02: number = 5;
    skillCd_03: number = 8;
    curShootCD_01: number = 0;
    curShootCD_02: number = 0;
    curShootCD_03: number = 0;

    start(){
        this.otherNode1 = this.node.parent.getChildByName("planeNormal_2");
        this.uiTransform = this.node.getComponent(UITransform);
        this.uiTransform.anchorY = 1;
    }

    update(deltaTime: number){
        //移动到指定为止后停止Y移动，改为X范围内移动
        if(this.node.position.y <= 200){
            this.bossMoveSpeedY = 0;
            if(this.otherNode1.getComponent(Player).dieState == true){
                this.bossMoveSpeedX = 0;
            }
            else if(this.node.position.x <= -140){
                this.bossMoveSpeedX = 80;
            }
            else if(this.node.position.x >= 140){
                this.bossMoveSpeedX = -80;
            }
        }
        
        //飞机移动
        let newX: number = this.node.position.x + this.bossMoveSpeedX * deltaTime;
        let newY: number = this.node.position.y - this.bossMoveSpeedY * deltaTime;
        let newZ: number = this.node.position.z;
        this.node.setPosition(newX, newY, newZ);

        //技能1
        if(this.skillCd_01 != 0 && this.node.parent.getChildByName("planeNormal_2").getComponent(Player).dieState == false){
            this.curShootCD_01 += deltaTime;
            if(this.curShootCD_01 > this.skillCd_01){
                let bossBullet: Node = instantiate(this.skillBullet_01);
                bossBullet.setParent(this.node.getParent());
                bossBullet.setPosition(v3(this.node.getPosition().x, this.node.getPosition().y - 100));
                this.curShootCD_01 = 0;
            } 
        }   
    }

    bossDie(){
        if(this.boss_HP > 0){
            this.boss_HP -= this.node.parent.getChildByName("img_bullet_01").getComponent(Bullet).BulletDamage;
        }
        else if(this.boss_HP == 0){
            this.bossMoveSpeedY = 0;
            this.bossMoveSpeedX = 0;
            this.otherNode1.getComponent(Player).KillScore += 70;
            let bossDiePic: string = null;
            switch(this.bossID){
                case 1: 
                    bossDiePic = "Images/Img/bossDestory_01/spriteFrame";
                    break;
                case 2: 
                    bossDiePic = "Images/Img/bossDestory_02/spriteFrame";
                    break;
                case 3: 
                    bossDiePic = "Images/Img/bossDestory_03/spriteFrame";
                    break;
                case 4: 
                    bossDiePic = "Images/Img/bossDestory_04/spriteFrame";
                    break;
                case 5: 
                    bossDiePic = "Images/Img/bossDestory_05/spriteFrame";
                    break;
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
            }, 3500);
        }
    }
}


