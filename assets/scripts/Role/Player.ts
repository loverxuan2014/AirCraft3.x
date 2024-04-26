import { _decorator, Component, Node, NodeEventType, v3, Prefab, EventTouch, instantiate, resources } from 'cc';
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

    //配置属性
    bulletShootCD: number = 0.5;
    playerLevel: number = 1;
    KillScore: number = 0;

    //Desc
    NoPlaneLevel: string = "飞机等级异常";

    start() {
        //控制飞机移动
        this.node.on(NodeEventType.TOUCH_MOVE, (touchPos: EventTouch) => {
            this.node.setWorldPosition(
                v3(touchPos.getLocation().x, touchPos.getLocation().y)
            );
        });
        //子弹发射
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
        },this.bulletShootCD);
    }

    //玩家死亡
    playerDie(fail){
        resources.load("Images/Img/planeDestory");
        //this.StageFail(fail);
    }
    
    //闯关成功
    StagePass(){

    }

    //闯关失败
    StageFail(stopTime){
        this.unscheduleAllCallbacks();
        stopTime.getComponent(Map).stopPlaneBorn();
        setTimeout(() => {
            this.node?.destroy();
        }, 500);
    }
}