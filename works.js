fetch("works.csv")
    .then(function(response) {
        return response.text();
    })
    .then(function(data)  {

        // CSVを行ごとに分割
        var rows = data.trim().split("\n");

        // 1行目は見出し
        var headers = rows[0].split(",");

        // 2行目以降を作品データにする
        var works = rows.slice(1).map(function(row) {

            var values = row.split(",");

            var work = {};

            headers.forEach(function(header, index) {
                work[header] = values[index];
            });

            return work;
        });

        // Worksを表示する場所
        var grid = document.getElementById("works-grid");

        // 作品を1つずつ表示
        works.forEach(function(work) {

            var card = document.createElement("works-grid");

            card.className = "work-card";

            card.innerHTML =
                '<a href="' + work.link + '">' +
                    '<img src="' + work.image + '" alt="' + work.title + '">' +
                    '<h4>' + work.image + '" alt="' + work.title + '">' +
                    '<p>' + work.description + '</p>' +
                '</a>';

            grid.appendChild(card);
        });

        // HTML要素を取得
        var grid = document.getElementById("works-grid");

        var categorySelect = document.getElementById("category");

        var sortSelect = document.getElementById("sort");

        // カテゴリ一覧を作る
        var categories = [];

        works.forEach(function(work) {
            // まだ追加されていないカテゴリならリストに追加
            if (!categories.includes(work.category)) {
                categories.push(work.category);
            }
        });

        // selectにカテゴリを追加しWebページに表示させる
        categories.forEach(function(category) {
            var option = document.createElement("option");
            option.value = category;
            option.textContext = category;
            categorySelect.appendChild(option);
        });

        // 作品を表示する関数
        function displayWorks() {

            // 選択されたカテゴリを取得
            var selectedCategory = categorySelect.value;

            // 選択されたソート方法を取得
            var sortType = sortSelect.value;

            // 元のworksをコピー
            var filteredWorks = works.slice();

            // カテゴリ絞り込み
            if (selectedCategory !== "all") {
                filteredWorks = filteredWorks.filter(function(work) {
                    return work.category === selectedCategory;
                });
            }

            // ソート
            if (sortType === "new") {
                filteredWorks.sort(function(a, b) {
                    return Number(b.year) - Number(a.year);
                });
            }
            else if (sortType === "old") {
                filteredWorks.sort(function(a, b) {
                    return Number(a.year) - Number(b.year);
                });
            }
            else if (sortType === "title") {
                filteredWorks.sort(function(a, b) {
                    return a.title.localeCompare(b.title, "ja");
                });
            }
            // 画面を一度空にする
            grid.innerHTML = "";

            // 作品を1つずつ表示する
            filteredWorks.forEach(function(work) {

                var card = document.createElement("article");

                card.className = "work-card";

                card.innerHTML =
                    '<a href="' + work.link + '">' +
                        '<img src="' + work.image + '" alt="' + work.title + '">' +
                        '<div class="work-info">' +
                            '<p class="work-category">' + work.category + '</p>' +
                            '<h4>' + work.title + '</h4>' +
                            '<p>' + work.description + '</p>' +
                            '<p class="work-year">' + work.year + '</p>' +
                        '</div>' +
                    '</a>';
                grid.appendChild(card);
            });
        }

        // 最初に表示
        displayWorks();

        // カテゴリ変更時
        categorySelect.addEventListener("change", function() {
            displayWorks();
        });

        // ソート変更時
        sortSelect.addEventListener("change", function() {
            displayWorks();
        });

    })

var latitude = 35.6895;
var longitude = 139.6917;

var weatherUrl =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=" + latitude +
    "&longitude=" + longitude +
    "&current=temperature_2m,weather_code" +
    "&timezone=Asia%2FTokyo";

fetch(weatherUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var weatherCode = data.current.weather_code;
        showWeather(weatherCode);
    })

function showWeather(code) {

    var icon = document.getElementById("weather-icon");

    if (code === 0) {
        icon.textContent = "☀";
        document.body.className = "weather-sunny";

    } else if (code >= 1 && code <= 3) {
        icon.textContent = "☁";
        document.body.className = "weather-cloudy"

    } else if (code >= 51 && code <= 67) {
        icon.textContent = "☂";
        document.body.className = "weather-cloudy"
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slideshow .slide');
  if (slides.length === 0) return;

  let currentSlide = 0;
  const intervalTime = 2500; // 2.5秒

  setInterval(() => {
    // 現在の画像から active クラスを削除
    slides[currentSlide].classList.remove('active');

    // 次の画像インデックス（12枚終わったら0に戻る）
    currentSlide = (currentSlide + 1) % slides.length;

    // 次の画像に active クラスを付与
    slides[currentSlide].classList.add('active');
  }, intervalTime);
});