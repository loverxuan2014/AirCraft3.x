import { _decorator, Component, Node, UITransform, Prefab, instantiate, v3, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Map')
export class Map extends Component {
    //�ⲿ����
    @property(Prefab)
    enemyPre1: Prefab = null;
    @property(Prefab)
    BossPre1: Prefab = null;
    @property(Prefab)
    BossPre2: Prefab = null;
    @property(Prefab)
    BossPre3: Prefab = null;
    @property(Prefab)
    BossPre4: Prefab = null;
    @property(Prefab)
    BossPre5: Prefab = null;

    //��������
    MapMoveSpeed: number = 100;
    enemyBornCD: number = 1000;
    enemyBornY: number = 578;
    planeBorn: number = null;

    start() {
        this.PlaneBorn();
        //��ȡaudio����Ȩ��
        //navigator.mediaDevices.getUserMedia({ audio: true });
    }

    update(deltaTime: number) {
        //�����ƶ�
        for (let map of this.node.children) {
            let mapSize = map.getComponent(UITransform).contentSize;
            let newX: number = map.position.x;
            let newY: number = map.position.y - this.MapMoveSpeed * deltaTime;
            let newZ: number = map.position.z;
            if (newY <= -1 * mapSize.y - 1) {
                newY += mapSize.y * 2;
            }
            map.setPosition(newX, newY, newZ);
        }
    }

    PlaneBorn() {
        //���ɷɻ�
        this.planeBorn = setInterval(() => {
            let enemy = instantiate(this.enemyPre1);
            enemy.setParent(this.node.getParent());
            enemy.setPosition(v3(math.randomRange(-260, 260), this.enemyBornY));
        }, this.enemyBornCD);
    }

    stopPlaneBorn() {
        //ֹͣ�ɻ����ɼ�ʱ��
        clearInterval(this.planeBorn);
    }

    BossBorn(){
        let bossNum: number = Math.floor(math.randomRange(1,6));
        let boss = null;
        switch(bossNum){
            case 1: boss = instantiate(this.BossPre1);
            case 2: boss = instantiate(this.BossPre2);
            case 3: boss = instantiate(this.BossPre3);
            case 4: boss = instantiate(this.BossPre4);
            case 5: boss = instantiate(this.BossPre5);
        }
        boss.setParent(this.node.getParent());
        boss.setPosition(v3(26, 720));
    }
}