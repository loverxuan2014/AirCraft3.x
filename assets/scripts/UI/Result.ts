import { _decorator, Component, Node, Label, Color} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Result')
export class Result extends Component {
    label: Label = null;

    start(){
        this.label = this.node.getComponent(Label);
        this.label.enabled = false;
    };

    Show(text: string, color: string) {
        this.label.enabled = true;
        this.label.string = text;
        this.label.color = new Color().fromHEX(color);
    }
}


