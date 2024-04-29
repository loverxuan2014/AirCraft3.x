import { _decorator, Component, Node, Label } from 'cc';
import { Player } from '../Role/Player';
const { ccclass, property } = _decorator;

@ccclass('Score')
export class Score extends Component {
    label: Label = null;
    
    start() {
        this.label = this.node.getComponent(Label);
    }

    update(deltaTime: number) {
        this.label.string = "Score:" + this.node.parent.getChildByName("planeNormal_2").getComponent(Player).KillScore;
    }
}


