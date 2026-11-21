AOS.init({
    duration: 680,
    once: true,
    offset: 55
});

/* NAVBAR SCROLL & ACTIVE LINK  */
window.addEventListener('scroll', function() {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('btt').classList.toggle('show', window.scrollY > 300);
    document.querySelectorAll('section[id]').forEach(function(sec) {
        var top = sec.offsetTop - 110,
            bot = top + sec.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bot) {
            document.querySelectorAll('.nav-link').forEach(function(l) {
                l.classList.remove('active');
            });
            var lnk = document.querySelector('.nav-link[href="#' + sec.id + '"]');
            if (lnk) lnk.classList.add('active');
        }
    });
});

/*  SMOOTH SCROLL + MOBILE NAV CLOSE  */
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var t = document.querySelector(href);
        if (t) {
            e.preventDefault();
            var navCollapse = document.getElementById('navmenu');
            if (navCollapse && navCollapse.classList.contains('show')) {
                var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                } else {
                    navCollapse.classList.remove('show');
                }
            }
            setTimeout(function() {
                window.scrollTo({
                    top: t.offsetTop - 78,
                    behavior: 'smooth'
                });
            }, 50);
        }
    });
});

var searchOv = document.getElementById('searchOv');

if (document.getElementById('navSearchBtn')) {
    document.getElementById('navSearchBtn').addEventListener('click', function() {
        searchOv.classList.add('open');
        document.body.style.overflow = 'hidden';
        setTimeout(function() {
            document.getElementById('searchInput').focus();
        }, 220);
    });
}

if (document.getElementById('searchClose')) {
    document.getElementById('searchClose').addEventListener('click', closeSearch);
}

if (searchOv) {
    searchOv.addEventListener('click', function(e) {
        if (e.target === searchOv) closeSearch();
    });
}

function closeSearch() {
    if (searchOv) {
        searchOv.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Category buttons inside search box
document.querySelectorAll('.sovcat').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.sovcat').forEach(function(b) {
            b.classList.remove('active');
        });
        this.classList.add('active');
        var f = this.getAttribute('data-cat');
        closeSearch();
        setTimeout(function() {
            filterMenu(f);
            document.getElementById('menu').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    });
});

document.querySelectorAll('.sovtrend .ttag').forEach(function(t) {
    t.addEventListener('click', function() {
        document.getElementById('searchInput').value = this.textContent.trim();
        document.getElementById('searchInput').focus();
    });
});

$(document).ready(function() {
    if (typeof $.fn.magnificPopup !== 'undefined') {
        $('.magnific_popup').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }
});

function filterMenu(cat) {
    document.querySelectorAll('.filtbtn').forEach(function(b) {
        b.classList.toggle('active', b.getAttribute('data-f') === cat);
    });
    document.querySelectorAll('.catcard').forEach(function(c) {
        c.classList.toggle('active', c.getAttribute('data-filter') === cat);
    });
    document.querySelectorAll('.mwrap').forEach(function(w) {
        var c = w.getAttribute('data-c');
        if (cat === 'all' || c === cat) {
            w.classList.remove('gone');
            w.style.opacity = '0';
            w.style.transform = 'translateY(16px)';
            setTimeout(function() {
                w.style.transition = 'opacity .38s,transform .38s';
                w.style.opacity = '1';
                w.style.transform = 'translateY(0)';
            }, 60);
        } else {
            w.classList.add('gone');
        }
    });
}

document.querySelectorAll('.filtbtn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        filterMenu(this.getAttribute('data-f'));
    });
});

document.querySelectorAll('.catcard').forEach(function(card) {
    card.addEventListener('click', function() {
        var f = this.getAttribute('data-filter');
        window.scrollTo({
            top: document.getElementById('menu').offsetTop - 80,
            behavior: 'smooth'
        });
        setTimeout(function() {
            filterMenu(f);
        }, 480);
    });
});

var menuPop = document.getElementById('menuPop');

function openMenuPop(card) {
    var img = card.getAttribute('data-img');
    var title = card.getAttribute('data-title');
    var cat = card.getAttribute('data-cat');
    var price = card.getAttribute('data-price');
    var time = card.getAttribute('data-time');
    var desc = card.getAttribute('data-desc');
    var tags = card.getAttribute('data-tags') || '';

    document.getElementById('mpImg').setAttribute('src', img);
    document.getElementById('mpCat').textContent = cat;
    document.getElementById('mpTitle').textContent = title;
    document.getElementById('mpDesc').textContent = desc;

    document.getElementById('mpPrice').innerHTML = '';
    document.getElementById('mpPrice').style.display = 'none';

    document.getElementById('mpMeta').innerHTML =
        '<div class="mpm"><div class="mpmv">' + time + ' min</div><div class="mpml">Duração Estimada</div></div>';

    document.getElementById('mpTags').innerHTML =
        tags.split(',').filter(Boolean).map(function(t) {
            return '<span class="mptag">' + t.trim() + '</span>';
        }).join('');

    menuPop.classList.add('open');
    document.body.style.overflow = 'hidden';
}

document.querySelectorAll('.mcard').forEach(function(card) {
    card.addEventListener('click', function() {
        openMenuPop(this);
    });
});

document.querySelectorAll('.madd').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        openMenuPop(this.closest('.mcard'));
    });
});

document.querySelectorAll('.mhrt').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var ico = this.querySelector('i');
        ico.classList.toggle('far');
        ico.classList.toggle('fas');
        this.style.color = ico.classList.contains('fas') ? 'var(--primary)' : '#ccc';
    });
});

if (document.getElementById('mpClose')) {
    document.getElementById('mpClose').addEventListener('click', closeMenuPop);
}

if (menuPop) {
    menuPop.addEventListener('click', function(e) {
        if (e.target === this) closeMenuPop();
    });
}

function closeMenuPop() {
    if (menuPop) {
        menuPop.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Botão de Agendamento dentro do Popup

var WHATSAPP_NUMERO = '5514996599944'; // 55 (Brasil) + DDD + número

if (document.getElementById('mpAddCart')) {
    document.getElementById('mpAddCart').addEventListener('click', function() {
        var servico = document.getElementById('mpTitle').textContent.trim();
        var mensagem = 'Olá! Gostaria de agendar o serviço: ' + servico;
        var url = 'https://wa.me/' + WHATSAPP_NUMERO + '?text=' + encodeURIComponent(mensagem);
        window.open(url, '_blank');
    });
}

if (document.getElementById('resBtn')) {
    document.getElementById('resBtn').addEventListener('click', function() {
        var btn = this;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Reservando...';
        btn.disabled = true;
        setTimeout(function() {
            btn.innerHTML = '<i class="fas fa-calendar-check"></i> Confirmar Agendamento';
            btn.disabled = false;
            var ok = document.getElementById('resOk');
            if (ok) {
                ok.style.display = 'block';
                ok.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        }, 1500);
    });
}

if (document.getElementById('ctcBtn')) {
    document.getElementById('ctcBtn').addEventListener('click', function() {
        var btn = this;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        btn.disabled = true;
        setTimeout(function() {
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
            btn.disabled = false;
            var ok = document.getElementById('ctcOk');
            if (ok) {
                ok.style.display = 'block';
                ok.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        }, 1500);
    });
}

var galPop = document.getElementById('galPop');
var galData = [];
var galIdx = 0;

document.querySelectorAll('.gitem').forEach(function(item) {
    galData.push({
        img: item.getAttribute('data-gimg'),
        title: item.getAttribute('data-gtitle'),
        desc: item.getAttribute('data-gdesc')
    });
    item.addEventListener('click', function() {
        openGal(parseInt(this.getAttribute('data-gi')));
    });
});

function openGal(i) {
    galIdx = i;
    var g = galData[i];
    document.getElementById('gpImg').setAttribute('src', g.img);
    document.getElementById('gpTitle').textContent = g.title;
    document.getElementById('gpDesc').innerHTML = g.desc;
    galPop.classList.add('open');
    document.body.style.overflow = 'hidden';
}

if (document.getElementById('gpClose')) {
    document.getElementById('gpClose').addEventListener('click', closeGal);
}

if (galPop) {
    galPop.addEventListener('click', function(e) {
        if (e.target === this) closeGal();
    });
}

function closeGal() {
    if (galPop) {
        galPop.classList.remove('open');
        document.body.style.overflow = '';
    }
}

if (document.getElementById('gpPrev')) {
    document.getElementById('gpPrev').addEventListener('click', function() {
        openGal((galIdx - 1 + galData.length) % galData.length);
    });
}
if (document.getElementById('gpNext')) {
    document.getElementById('gpNext').addEventListener('click', function() {
        openGal((galIdx + 1) % galData.length);
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSearch();
        closeMenuPop();
        closeGal();
        if (typeof $.magnificPopup !== 'undefined') $.magnificPopup.close();
    }
});

if (document.querySelector('.tesSwiper')) {
    new Swiper('.tesSwiper', {
        slidesPerView: 1,
        spaceBetween: 22,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });
}

/* Newsletter ajustado para contato/notificações de beleza */
if (document.getElementById('nlBtn')) {
    document.getElementById('nlBtn').addEventListener('click', function() {
        var email = document.getElementById('nlEmail').value;
        if (email && email.includes('@')) {
            var btn = this;
            btn.textContent = '✓ Cadastrado!';
            btn.style.background = '#d4a373';
            btn.style.color = '#fff';
            document.getElementById('nlEmail').value = '';
            setTimeout(function() {
                btn.textContent = 'Cadastrar';
                btn.style.background = '';
                btn.style.color = '';
            }, 3000);
        }
    });
}

var numAnimated = false;
window.addEventListener('scroll', function() {
    var hero = document.getElementById('hero');
    if (!numAnimated && hero && window.scrollY > hero.offsetHeight - 300) {
        numAnimated = true;
        document.querySelectorAll('.snum').forEach(function(el) {
            var txt = el.textContent;
            var num = parseInt(txt);
            var suf = txt.replace(/[0-9]/g, '');
            if (isNaN(num)) return;
            var start = 0;
            var step = Math.ceil(num / 55);
            var iv = setInterval(function() {
                start += step;
                if (start >= num) {
                    start = num;
                    clearInterval(iv);
                }
                el.textContent = start + suf;
            }, 1400 / 55);
        });
    }
});
