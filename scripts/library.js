var version = '1.2.1';

class ChangelogSection {
    constructor(header, updateItem1, updateItem2, updateItem3) {
        this.Draw(header, updateItem1, updateItem2, updateItem3);
    };
    Draw(header, updateItem1, updateItem2, updateItem3) {
        const updateSection = document.createElement('div');
        updateSection.style.marginBottom = '1%';
        updateSection.style.fontFamily = 'Mukta Vaani';

        const updateHeader = document.createElement('p');
        updateHeader.innerHTML = header;
        updateHeader.style.fontWeight = 'bold';
        updateHeader.style.fontSize = '16px';
        updateHeader.style.marginLeft = '5%';
        updateHeader.style.fontFamily = 'Mukta Vaani';

        const updateContent = document.createElement('ul');
        updateContent.style.listStyleType = 'none';
        updateContent.style.marginLeft = '5%';
        updateContent.style.fontFamily = 'Mukta Vaani';

        const itemOne = document.createElement('li');
        itemOne.innerHTML = updateItem1;
        itemOne.style.fontFamily = 'Mukta Vaani';

        const itemTwo = (updateItem2 !== null) ? document.createElement('li') : null;
        (itemTwo == null) ? null : itemTwo.innerHTML = updateItem2;
        (itemTwo == null) ? null : itemTwo.style.fontFamily = 'Mukta Vaani';

        const itemThree = (updateItem3 !== null) ? document.createElement('li') : null;
        (itemThree == null) ? null : itemThree.innerHTML = updateItem3;
        (itemThree == null) ? null : itemThree.style.fontFamily = 'Mukta Vaani';

        updateSection.appendChild(updateHeader);
        updateContent.appendChild(itemOne);
        (itemTwo == null) ? null : updateContent.appendChild(itemTwo);
        (itemThree == null) ? null : updateContent.appendChild(itemThree);
        updateSection.appendChild(updateContent);
        const changelogContent = document.getElementById('changelogContent');
        changelogContent.appendChild(updateSection);
    };
};

class Announcement {
    constructor(title, content) {
        this.Draw(title, content);
    };
    Draw(title, content) {
        const announcementBox = document.createElement('div');
        announcementBox.id = 'announcementBox';
        announcementBox.style.zIndex = 10;
        announcementBox.style.position = 'absolute';
        announcementBox.style.left = '50%';
        announcementBox.style.top = '50%';
        announcementBox.style.width = '50%';
        announcementBox.style.height = 'flex';
        announcementBox.style.minHeight = '10%';
        announcementBox.style.transform = 'translate(-50%, -50%)';
        announcementBox.style.border = '2px solid darkorange';
        announcementBox.style.borderRadius = '5px';
        announcementBox.style.backgroundColor = 'orange';
        announcementBox.style.fontFamily = 'Mukta Vaani';

        const announcementTitle = document.createElement('p');
        announcementTitle.innerHTML = title;
        announcementTitle.style.textAlign = 'center';
        announcementTitle.style.fontWeight = 'bold';
        announcementTitle.style.fontSize = '20px';
        announcementTitle.style.marginBottom = '1%';
        announcementTitle.style.fontFamily = 'Mukta Vaani';

        const announcementContent = document.createElement('p');
        announcementContent.innerHTML = content;
        announcementContent.style.textAlign = 'center';
        announcementContent.style.fontFamily = 'Mukta Vaani';

        const closeButton = document.createElement('p');
        closeButton.innerHTML = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.top = 0;
        closeButton.style.right = '1%';
        closeButton.style.fontWeight = 'bold';
        closeButton.style.fontFamily = 'Mukta Vaani';
        closeButton.style.pointerEvents = 'click';
        closeButton.onclick = () => {
            announcementBox.style.display = 'none';
            localStorage.setItem('announcementShown', true);
        };

        announcementBox.appendChild(announcementTitle);
        announcementBox.appendChild(announcementContent);
        announcementBox.appendChild(closeButton);
        document.body.appendChild(announcementBox);
    };
};

class AlmanacPage {
    constructor(image, title, spawnRate, pointValue, specialFacts, description) {
        this.Draw(image, title, spawnRate, pointValue, specialFacts, description);
    };
    Draw(image, title, spawnRate, pointValue, specialFacts, description) {
        const fruitImage = document.createElement('img');
        fruitImage.src = image;
        fruitImage.style.margin = '5%';
        fruitImage.style.marginRight = '7%';
        fruitImage.style.border = '2px solid black';
        fruitImage.style.borderRadius = '5px';
        fruitImage.style.backgroundImage = 'url("images/background.png")';
        fruitImage.style.backgroundSize = '300px';
        fruitImage.style.width = '100px';
        fruitImage.style.height = '100px';

        const mainSection = document.createElement('div');
        mainSection.style.display = 'flex';
        mainSection.style.alignItems = 'center';

        const fruitName = document.createElement('p');
        fruitName.innerHTML = title;
        fruitName.style.textAlign = 'center';
        fruitName.style.margin = '5px';
        fruitName.style.fontSize = '17px';
        fruitName.style.fontWeight = 'bold';
        fruitName.style.fontFamily = 'Mukta Vaani';

        const mainStats = document.createElement('div');

        const statsHeader = document.createElement('p');
        statsHeader.innerHTML = 'Stats:';
        statsHeader.style.fontWeight = 'bold';
        statsHeader.style.fontFamily = 'Mukta Vaani';

        const spawnRateText = document.createElement('p');
        spawnRateText.innerHTML = 'Spawn Rate: ' + spawnRate;
        spawnRateText.style.fontFamily = 'Mukta Vaani';

        const pointValueText = document.createElement('p');
        pointValueText.innerHTML = 'Points Per Click: ' + pointValue;
        pointValueText.style.fontFamily = 'Mukta Vaani';

        const specialFactsText = document.createElement('p');
        specialFactsText.innerHTML = 'Special Attributes: ' + specialFacts;
        specialFactsText.style.fontFamily = 'Mukta Vaani';

        const otherInfoHeader = document.createElement('p');
        otherInfoHeader.innerHTML = 'Other Information:';
        otherInfoHeader.style.fontWeight = 'bold';
        otherInfoHeader.style.marginLeft = '2%';
        otherInfoHeader.style.fontFamily = 'Mukta Vaani';

        const fruitDescriptionText = (description !== null) ? document.createElement('p') : null;
        (description !== null) ? fruitDescriptionText.innerHTML = description : null;
        (description !== null) ? fruitDescriptionText.style.marginLeft = '2%' : null;
        (description !== null) ? fruitDescriptionText.style.fontFamily = 'Mukta Vaani' : null;

        const contentPage = document.getElementById(`${(title == 'Orange') ? 'almanacContentOrange' : (title == 'Watermelon') ? 'almanacContentWatermelon' : (title == 'Strawberry') ? 'almanacContentStrawberry' : (title == 'Pepper') ? 'almanacContentPepper' : (title == 'Bomb') ? 'almanacContentBomb' : (title == 'Frozen Watermelon') ? 'almanacContentFrozenWatermelon' : (title == 'Carrot') ? 'almanacContentCarrot' : 'almanacContentTomato'}`);
        contentPage.appendChild(fruitName);
        mainSection.appendChild(fruitImage);
        mainStats.appendChild(statsHeader);
        mainStats.appendChild(spawnRateText);
        mainStats.appendChild(pointValueText);
        mainStats.appendChild(specialFactsText);
        mainSection.appendChild(mainStats);
        contentPage.appendChild(mainSection);
        contentPage.appendChild(otherInfoHeader);
        (description !== null) ? contentPage.appendChild(fruitDescriptionText) : null;
    };
};

class Version {
    constructor() {
        this.Draw();
    };
    Draw() {
        const versionText = document.createElement('p');
        versionText.innerHTML = 'Version ' + version;
        versionText.style.position = 'absolute';
        versionText.style.bottom = 0;
        versionText.style.right = '5px';
        versionText.style.fontSize = '15px';
        versionText.style.fontFamily = 'Mukta Vaani';

        document.body.appendChild(versionText);
    };
};
