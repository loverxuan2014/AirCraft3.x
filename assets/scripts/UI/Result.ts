import { _decorator, Component, Node, Label, Color} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Result')
export class Result extends Component {
    label: Label = null;

    start(){
        this.label = this.node.getComponent(Label);
        this.label.enabled = false;
    };

    victory() {
        this.label.enabled = true;
        this.label.string = "Victory";
        this.label.color = new Color().fromHEX("#E9A224");
    }

    failed() {
        this.label.enabled = true;
        this.label.string = "Fail"; 
        this.label.color = new Color().fromHEX("#BDB9B1");
    }
}


