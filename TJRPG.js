const $mainScreen = document.querySelector('#main-screen');
const $heroStat = document.querySelector('#hero-stat');
const $startScreen = document.querySelector('#start-screen');
const $gameMenu = document.querySelector('#game-menu');
const $battleMenu = document.querySelector('#battle-menu');
const $heroName = document.querySelector('#hero-name');
const $heroLevel = document.querySelector('#hero-level');
const $heroHp = document.querySelector('#hero-hp');
const $heroXp = document.querySelector('#hero-xp');
const $heroGold = document.querySelector('#hero-gold');
const $heroAtk = document.querySelector('#hero-atk');
const $heroDef = document.querySelector('#hero-def');
const $monsterName = document.querySelector('#monster-name');
const $monsterStatus = document.querySelector('#monster-status');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterMp = document.querySelector('#monster-mp');
const $monsterAtk = document.querySelector('#monster-atk');
const $monsterDef = document.querySelector('#monster-def');
const $message = document.querySelector('#message');
const $heroExpBar = document.querySelector('#hero-expBar');
const $heroHpBar = document.querySelector('#hero-hpBar');

// MainMenu
$mainScreen.addEventListener('click', (e) => {
    e.preventDefault();
    const mainMenuSelect = e.target.textContent;
    if (mainMenuSelect === 'Start') { // 시작메뉴
        $mainScreen.style.display = 'none';
        $startScreen.style.display = 'block';
    } else if (mainMenuSelect === 'Load') { // 로드메뉴

    } else if (mainMenuSelect === 'Exit') { // 종료메뉴
        window.close();
    }
});

class Game {
    constructor(name) {
        this.monster = null;
        this.hero = null;
        //game, name, hp, mp, atk, def, block, accuracy, evasion, xp, gold
        this.monsterList = [{
            name: 'スライム',
            hp: 25,
            mp: 0,
            atk: 10,
            def: 0,
            block: 0,
            accuracy: 100,
            evasion: 10,
            xp: 10,
            gold: 5
        }, {
            name: 'ゴブリン',
            hp: 30,
            mp: 0,
            atk: 15,
            def: 5,
            block: 5,
            accuracy: 200,
            evasion: 20,
            xp: 15,
            gold: 10
        }, {
            name: 'ゾンビ',
            hp: 70,
            mp: 0,
            atk: 20,
            def: 20,
            block: 10,
            accuracy: 250,
            evasion: 0,
            xp: 20,
            gold: 10
        }, {
            name: 'スケルトン',
            hp: 50,
            mp: 0,
            atk: 15,
            def: 10,
            block: 10,
            accuracy: 200,
            evasion: 15,
            xp: 20,
            gold: 20
        }, {
            name: '魔王',
            hp: 150,
            mp: 100,
            atk: 50,
            def: 50,
            block: 25,
            accuracy: 1000,
            evasion: 25,
            xp: 50,
            gold: 500
        }, ];
        this.itemList = [{
            name: '長剣',
            atk: 20,
            def: 0,
            speed: 1.0,
            hit: 50,
        }, {
            name: '剣',
            atk: 15,
            def: 10,
            speed: 1.2,
            hit: 75,
        }, {
            name: '短剣',
            atk: 10,
            def: 0,
            speed: 1.5,
            hit: 75,
        }, {
            name: '槌',
            atk: 20,
            def: 0,
            speed: 1.0,
            hit: 80,
        }, {
            name: '斧',
            atk: 25,
            def: 10,
            speed: 1.0,
            hit: 80,
        }, {
            name: 'クロー',
            atk: 12,
            def: 0,
            speed: 1.5,
            hit: 70,
        }, {
            name: '盾',
            atk: 0,
            def: 10,
            speed: 1.0,
            hit: 0,
        }, {
            name: '弓',
            atk: 15,
            def: 0,
            speed: 1.3,
            hit: 70,
        }, {
            name: '矢筒',
            atk: 0,
            def: 5,
            speed: 1.2,
            hit: 0,
        }, {
            name: '杖',
            atk: 15,
            def: 0,
            speed: 1.1,
            hit: 70,
        }, ];
        this.grade = ['ノーマル', 'マジック', 'レアー', 'ユニーク'];
        this.start(name);
    }
    start(name) {
        $gameMenu.addEventListener('click', this.onGameMenu);
        $battleMenu.addEventListener('click', this.onBattleMenu);
        this.changeScreen('game');
        this.hero = new Hero(this, name);
        this.updateHeroStat();
        this.showMessage('');
    }
    changeScreen(screen) {
        if (screen === 'start') {
            $heroStat.style.display = 'none';
            $startScreen.style.display = 'block';
            $gameMenu.style.display = 'none';
            $battleMenu.style.display = 'none';
        } else if (screen === 'game') {
            $heroStat.style.display = 'flex';
            $startScreen.style.display = 'none';
            $gameMenu.style.display = 'block';
            $battleMenu.style.display = 'none';
        } else if (screen === 'battle') {
            $heroStat.style.display = 'flex';
            $startScreen.style.display = 'none';
            $gameMenu.style.display = 'none';
            $battleMenu.style.display = 'block';
        } else if (screen === 'main') {
            $heroStat.style.display = 'none';
            $startScreen.style.display = 'none';
            $gameMenu.style.display = 'none';
            $battleMenu.style.display = 'none';
            $mainScreen.style.display = 'block';
        }
    }

    onGameMenu = (e) => {
        e.preventDefault();
        const gameMenuSelect = e.target.textContent;
        if (gameMenuSelect === "冒険") { // 모험메뉴
            this.changeScreen('battle');
            const randomIndex = Math.floor(Math.random() * this.monsterList.length);
            const randomMonster = this.monsterList[randomIndex];
            //game, name, hp, mp, atk, def, block, accuracy, evasion, blocked, evade, xp, gold
            this.monster = new Monster(this,
                randomMonster.name,
                randomMonster.hp,
                randomMonster.mp,
                randomMonster.atk,
                randomMonster.def,
                randomMonster.block,
                randomMonster.accuracy,
                randomMonster.evasion,
                false,
                false,
                randomMonster.xp,
                randomMonster.gold,
            );
            this.updateMonsterStat();
            this.showMessage(`モンスターが現れた。${this.monster.name}のようだ!`);
        } else if (gameMenuSelect === "旅館") { // 휴식메뉴
            if (this.hero.gold >= 20) {
                this.hero.spendGold(20);
                this.hero.hp = this.hero.maxHp;
            } else if (this.hero.gold < 20) {
                this.showMessage('Goldが足りません。');
                return;
            }
            this.updateHeroStat();
            this.showMessage('旅館で十分に休息を取った。 20Goldを払った。');

        } else if (gameMenuSelect === "終了") { // 종료메뉴
            this.showMessage('');
            this.quit();
            this.changeScreen('main');
        }
    }

    onBattleMenu = (e) => {
        e.preventDefault();
        const battleMenuSelect = e.target.textContent;
        if (battleMenuSelect === "攻撃") { // 공격메뉴
            const {
                hero,
                monster
            } = this;
            const heroDamage = Math.ceil(hero.atk * (1 - (monster.def / (monster.def + 100))));
            const monsterDamage = Math.ceil(monster.atk * (1 - (hero.def / (hero.def + 100))));
            let heroHit = '';
            let monsterHit = '';
            hero.attack(monster);
            monster.attack(hero);
            if (hero.hp <= 0) {
                this.showMessage(`${hero.name}が死んでしまった。`);
                this.quit();
            } else if (monster.hp <= 0) {
                this.showMessage(`${monster.name}を倒して,${monster.xp}経験値と${monster.gold}Goldを得た。`);
                hero.getXp(monster.xp);
                hero.getGold(monster.gold);
                this.monster = null;
                this.changeScreen('game');
            } else {
                if (hero.evade) {
                    heroHit = `${monster.name}のダメージを回避した。`;
                } else if (hero.blocked) {
                    heroHit = `${monster.name}のダメージを防御した。`;
                } else {
                    heroHit = `${monsterDamage}ダメージを受けた。`;
                }
                if (monster.evade) {
                    monsterHit = `${monster.name}に回避された。、`;
                } else if (monster.blocked) {
                    monsterHit = `${monster.name}に防御された。、`;
                } else {
                    monsterHit = `${heroDamage}ダメージを与えた。、`;
                }
                this.showMessage(monsterHit + heroHit);
            }
            this.updateHeroStat();
            this.updateMonsterStat();
        } else if (battleMenuSelect === "回復") { // 회복메뉴
            const {
                hero,
                monster
            } = this;
            let heroHit = '';
            const monsterDamage = Math.ceil(monster.atk * (1 - (hero.def / (hero.def + 100))));
            hero.heal();
            monster.attack(hero);
            if (hero.evade) {
                heroHit = `${monster.name}のダメージを回避した。`;
            } else if (hero.blocked) {
                heroHit = `${monster.name}のダメージを防御した。`;
            } else {
                heroHit = `${monsterDamage}ダメージを受けた。`;
            }
            this.showMessage('体力を 少し 回復した! ' + heroHit);
            this.updateHeroStat();
        } else
        if (battleMenuSelect === "逃げる") { // 도망메뉴
            this.changeScreen('game');
            this.showMessage('急いて 逃げた!');
            this.monster = null;
            this.updateMonsterStat();
        }
    }

    updateHeroStat() {
        const {
            hero
        } = this;
        if (hero === null) {
            $heroName.textContent = '';
            $heroLevel.textContent = '';
            $heroHp.textContent = '';
            $heroXp.textContent = '';
            $heroGold.textContent = '';
            $heroAtk.textContent = '';
            $heroDef.textContent = '';
            return;
        }
        $heroName.textContent = hero.name;
        $heroLevel.textContent = `${hero.lev}`;
        $heroHp.textContent = `${hero.hp}/${hero.maxHp}`;
        $heroHpBar.max = hero.maxHp;
        $heroHpBar.low = hero.maxHp * 0.26;
        $heroHpBar.high = hero.maxHp * 0.76;
        $heroHpBar.optimum = hero.maxHp * 0.8;
        $heroHpBar.value = hero.hp;
        $heroXp.textContent = `${hero.xp}/${15* hero.lev}`;
        $heroGold.textContent = `${hero.gold}`;
        $heroExpBar.max = 15 * hero.lev;
        $heroExpBar.value = hero.xp;
        $heroAtk.textContent = `${hero.atk}`;
        $heroDef.textContent = `${hero.def}`;
    }

    updateMonsterStat() {
        const {
            monster
        } = this;
        if (monster === null) {
            $monsterName.textContent = '';
            $monsterStatus.title = '';
            $monsterHp.textContent = '';
            $monsterMp.textContent = '';
            $monsterAtk.textContent = '';
            $monsterDef.textContent = '';
            return;
        }
        $monsterName.textContent = monster.name;
        $monsterStatus.title = `HP: ${monster.hp} MP: ${monster.mp} ATK: ${monster.atk} DEF: ${monster.def} BLOCK: ${monster.block} ACC: ${monster.accuracy} EVA: ${monster.evasion}`;
        $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
        $monsterMp.textContent = `MP: ${monster.mp}/${monster.maxMp}`;
        $monsterAtk.textContent = `ATK: ${monster.atk}`;
        $monsterDef.textContent = `DEF: ${monster.def}`;
    }

    showMessage(text) {
        $message.textContent = text;
    }

    quit() {
        this.hero = null;
        this.monster = null;
        this.updateHeroStat();
        this.updateMonsterStat();
        $gameMenu.removeEventListener('click', this.onGameMenu);
        $battleMenu.removeEventListener('click', this.onBattleMenu);
        this.changeScreen('start');
        game = null;
    }
}

class Unit {
    constructor(game, name, hp, mp, atk, def, block, accuracy, evasion, blocked, evade, xp, gold) {
        this.game = game;
        this.name = name;
        this.maxHp = hp;
        this.hp = hp;
        this.maxMp = mp;
        this.mp = mp;
        this.atk = atk;
        this.def = def;
        this.block = block;
        this.accuracy = accuracy;
        this.evasion = evasion;
        this.blocked = blocked;
        this.evade = evade;
        this.xp = xp;
        this.gold = gold;
    }
    attack(target) {
        const damage = Math.ceil(this.atk * (1 - (target.def / (target.def + 100))));
        const evade = this.getEvaded(this.accuracy, target.evasion);
        const block = this.getBlocked(target.block);
        // 기본 false로 초기화
        target.evade = false;
        target.blocked = false;
        if (evade) {
            target.evade = evade;
            return;
        } else if (block) {
            target.blocked = block;
            return;
        } else {
            target.hp -= damage;
        }
    }
    getEvaded(accuracy, evasion) {
        const random = Math.floor(Math.random() * 100);
        const evade = (accuracy / (accuracy + 100)) * 100 - (evasion / (evasion + 10)) * 100;
        if (evade > random) {
            return true;
        } else if (evade <= random) {
            return false;
        }
    }
    getBlocked(block) {
        const random = Math.floor(Math.random() * 100);
        const blcok = (block / (block + 100)) * 100;
        if (blcok > random) {
            return true;
        } else if (blcok <= random) {
            return false;
        }
    }
}

class Hero extends Unit {
    constructor(game, name) {
        //game, name, hp, mp, atk, def, block, accuracy, evasion, blocked, evade, xp, gold
        super(game, name, 100, 10, 10, 5, 0, 100, 10, false, false, 0, 100);
        // 추가
        this.lev = 1;
        this.str = 0;
        this.dex = 0;
        this.int = 0;
        this.sp = 0;
    }
    attack(target) {
        super.attack(target);
    }
    heal() {
        // 최대 체력의 20%를 회복, 체력 회복은 최대 체력을 넘을 수 없다.
        this.hp = Math.min(this.maxHp, Math.floor(this.hp + this.maxHp * 0.2));
    }
    getXp(xp) {
        this.xp += xp;
        if (this.xp >= this.lev * 15) {
            this.xp -= this.lev * 15;
            this.lev += 1;
            this.sp += 2;
            this.maxHp += 10;
            this.atk += 5;
            this.def += 2;
            this.hp = this.maxHp;
            this.game.showMessage(`レベルアップ！ レベルが${this.lev}になった。`);
        }
    }
    spendGold(gold) {
        this.gold -= gold;
    }
    getGold(gold) {
        this.gold += gold;
    }
}
class Monster extends Unit {
    constructor(game, name, hp, mp, atk, def, block, accuracy, evasion, blocked, evade, xp, gold) {
        //game, name, hp, mp, atk, def, block, accuracy, evasion, blocked, evade, xp, gold
        super(game, name, hp, mp, atk, def, block, accuracy, evasion, blocked, evade, xp, gold);
    }
    attack(target) {
        super.attack(target);
    }
}

let game = null;

$startScreen.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target['name-input'].value;
    game = new Game(name);
});