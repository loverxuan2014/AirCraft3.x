import { _decorator, Component, Node, NodeEventType, v3, Prefab, EventTouch, instantiate, resources, SpriteFrame, Sprite, Script, Vec3 } from 'cc';
import { Map } from '../Map/Map';

const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    //外部属性
    @property(Prefab)
    private bulletLv1_Pre: Prefab = null;
    @property(Prefab)
    private bulletLv2_Pre: Prefab = null;
    @property(Prefab)
    private bulletLv3_pre: Prefab = null;
    @property(Prefab)
    private bulletLv4_pre: Prefab = null;
    @property(Node)
    otherNode1: Node = null;

    //配置属性
    bulletShootCD: number = 0.5;
    playerLevel: number = 1;
    KillScore: number = 0;
    rebirthTimes: number = 3;
    dieState: boolean = false;
    bornPos: Vec3 = null;

    //Desc
    NoPlaneLevel: string = "飞机等级异常。";
    StartPlane: String = "开始控制飞机。";

    start() {
        //获取重生点坐标
        this.bornPos = this.node.position;
        //正常状态
        if (this.dieState == false) {
            console.log(this.StartPlane);
            //控制飞机移动
            this.node.on(NodeEventType.TOUCH_MOVE, (touchPos: EventTouch) => {
                this.node.setWorldPosition(
                    v3(touchPos.getLocation().x, touchPos.getLocation().y)
                );
            });
            //控制子弹发射
            this.schedule(() => {
                let playerBullet: Node = null;
                switch (this.playerLevel) {
                    case 1: playerBullet = instantiate(this.bulletLv1_Pre);
                        break;
                    case 2: playerBullet = instantiate(this.bulletLv2_Pre);
                        break;
                    case 3: playerBullet = instantiate(this.bulletLv3_pre);
                        break;
                    case 4: playerBullet = instantiate(this.bulletLv4_pre);
                        break;
                    default: console.log(this.NoPlaneLevel);
                }
                playerBullet.setParent(this.node.getParent());
                playerBullet.setPosition(v3(this.node.getPosition().x, this.node.getPosition().y + 50));
            }, this.bulletShootCD);
        }
    }


    update(deltaTime: number) {

    }

    //玩家死亡
    playerDie() {
        this.dieState = true;
        this.node.setPosition(this.bornPos);
        resources.load(
            "Images/Img/planeDestory/spriteFrame",
            SpriteFrame,
            (err: Error, res: SpriteFrame) => {
                if (err) {
                    return console.error("load SpriteFrame failed:" + err);
                }
                this.node.getComponent(Sprite).spriteFrame = res;
            });
        this.otherNode1.getComponent(Map).stopPlaneBorn();
        this.rebirthTimes -= 1;
        if (this.rebirthTimes = 0) {
            this.StageFail();
        }
        else {
            setTimeout(() => {
                resources.load(
                    "Images/Player/img_player_adv_01/spriteFrame",
                    SpriteFrame,
                    (err: Error, res: SpriteFrame) => {
                        if (err) {
                            return console.error("load SpriteFrame failed:" + err);
                        }
                        this.node.getComponent(Sprite).spriteFrame = res;
                    });
                this.otherNode1.getComponent(Map).PlaneBorn();
                this.dieState = false;
            }, 3000);
        }
    }
    
    //闯关成功
    StagePass(){

    }

    //闯关失败
    StageFail(){
        this.unscheduleAllCallbacks();
        this.KillScore = 0;
        setTimeout(() => {
            this.node?.destroy();
        }, 500);
    }
}