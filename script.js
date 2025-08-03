document.addEventListener('DOMContentLoaded', () => {
    // --- Custom Cursor ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (cursor && follower) {
        document.body.style.cursor = 'none'; // Hide default cursor

        document.addEventListener('mousemove', e => {
            cursor.style.display = 'block';
            follower.style.display = 'block';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.display = 'none';
            follower.style.display = 'none';
        });

        // Enlarge cursor on hover over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .portfolio-item, .service-card, .contact-method');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                follower.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                follower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // --- Navigation Bar Scroll Effect ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.8)';
        }
    });

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.querySelector('.burger-menu').classList.remove('open');
            }
        });
    });

    // --- Fade-in Animation on Scroll ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // --- Button Click Animation ---
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // --- Typewriter Effect for Hero Title ---
    const typewriterElement = document.querySelector('.typewriter');
    const textToType = "Minecraft Серверов";
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        if (!isDeleting && charIndex < textToType.length) {
            // Adding characters
            typewriterElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            typingSpeed = 100; // Speed for typing
        } else if (isDeleting && charIndex > 0) {
            // Deleting characters
            typewriterElement.textContent = textToType.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Speed for deleting
        } else if (!isDeleting && charIndex === textToType.length) {
            // Finished typing, pause before deleting
            isDeleting = true;
            typingSpeed = 2000; // Pause before starting to delete
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, pause before typing again
            isDeleting = false;
            typingSpeed = 1000; // Pause before starting to type
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 1000);

    // --- Portfolio Modal Logic ---
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modal = document.getElementById('portfolio-modal');
    const closeModalBtn = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalGallery = document.querySelector('.modal-gallery');
    const modalDescription = document.getElementById('modal-description');
    const modalDetails = document.getElementById('modal-details');
    const modalLink = document.getElementById('modal-link');

    const projectsData = {
        "mine-world": {
            title: "🎮 MineWorld Network",
            description: "Крупный сервер с 500+ игроков. Полная оптимизация и защита от DDoS атак. Задача: обеспечить стабильную работу при высокой нагрузке и защитить от внешних угроз. Решение: внедрение многоуровневой системы защиты, оптимизация ядра и плагинов, настройка балансировки нагрузки. Результат: стабильный TPS 19.8+, 99.9% аптайм, полное отсутствие DDoS-инцидентов.",
            details: [
                "**Роль:** Главный администратор, специалист по оптимизации и безопасности",
                "**Технологии:** PaperMC, BungeeCord, Nginx, Cloudflare, Custom Anti-DDoS, MySQL, Redis",
                "**Результат:** Стабильный онлайн, высокая производительность, надежная защита"
            ],
            images: [
                "https://via.placeholder.com/300x200?text=MineWorld+Screenshot+1",
                "https://via.placeholder.com/300x200?text=MineWorld+Screenshot+2",
                "https://via.placeholder.com/300x200?text=MineWorld+Screenshot+3"
            ],
            link: "#" // Replace with actual project link if available
        },
        "kingdom-craft": {
            title: "🏰 KingdomCraft",
            description: "Разработка кастомного плагина гильдий с уникальной системой ремесел и экономикой. Задача: создать глубокую систему взаимодействия игроков и стимулировать экономику сервера. Решение: проектирование и разработка плагина на Java с использованием Spigot API, интеграция с Vault и базами данных. Результат: уникальный геймплей, повышение вовлеченности игроков, стабильная экономика.",
            details: [
                "**Роль:** Разработчик плагинов",
                "**Технологии:** Java, Spigot API, MySQL, Vault API",
                "**Результат:** Уникальная система гильдий, повышение активности игроков"
            ],
            images: [
                "https://via.placeholder.com/300x200?text=KingdomCraft+Screenshot+1",
                "https://via.placeholder.com/300x200?text=KingdomCraft+Screenshot+2"
            ],
            link: "#"
        },
        "pvp-arena": {
            title: "⚔️ PvP Arena",
            description: "Создание автоматизированной системы PvP турниров с призами и рейтингом. Задача: предоставить игрокам динамичный и соревновательный PvP-опыт. Решение: разработка системы арены, матчмейкинга, статистики и выдачи наград. Результат: регулярные турниры, активное PvP-сообщество, прозрачная система рейтинга.",
            details: [
                "**Роль:** Разработчик, настройщик",
                "**Технологии:** Spigot, Custom Plugins, MySQL",
                "**Результат:** Увеличение PvP-активности, справедливая система соревнований"
            ],
            images: [
                "https://via.placeholder.com/300x200?text=PvP+Arena+Screenshot+1",
                "https://via.placeholder.com/300x200?text=PvP+Arena+Screenshot+2"
            ],
            link: "#"
        },
        "skyblock-universe": {
            title: "🌍 SkyBlock Universe",
            description: "Разработка модпака для SkyBlock с 50+ кастомными предметами и механиками. Задача: обновить классический SkyBlock, добавив глубины и разнообразия. Решение: создание новых рецептов, уникальных блоков, кастомных мобов и интеграция с существующими модами. Результат: свежий взгляд на SkyBlock, удержание игроков, новые возможности для развития.",
            details: [
                "**Роль:** Модпак-разработчик, геймдизайнер",
                "**Технологии:** Forge/Fabric, Custom Items/Blocks, Data Packs",
                "**Результат:** Инновационный SkyBlock опыт, высокая реиграбельность"
            ],
            images: [
                "https://via.placeholder.com/300x200?text=SkyBlock+Screenshot+1",
                "https://via.placeholder.com/300x200?text=SkyBlock+Screenshot+2",
                "https://via.placeholder.com/300x200?text=SkyBlock+Screenshot+3"
            ],
            link: "#"
        },
        "custom-minigame": {
            title: "🚀 Custom Minigame",
            description: "Разработка уникальной мини-игры с нуля, включая логику, карты и интеграцию с системой сервера. Задача: создать эксклюзивный контент для привлечения новой аудитории. Решение: полный цикл разработки от концепции до релиза, включая дизайн карт, программирование механик и тестирование. Результат: популярная мини-игра, увеличение онлайна, положительные отзывы игроков.",
            details: [
                "**Роль:** Ведущий разработчик мини-игры",
                "**Технологии:** Spigot API, Java, WorldEdit, Custom Maps",
                "**Результат:** Уникальный игровой режим, рост аудитории"
            ],
            images: [
                "https://via.placeholder.com/300x200?text=Minigame+Screenshot+1",
                "https://via.placeholder.com/300x200?text=Minigame+Screenshot+2",
                "https://via.placeholder.com/300x200?text=Minigame+Screenshot+3"
            ],
            link: "#"
        }
    };

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.dataset.project;
            const project = projectsData[projectId];

            if (project) {
                modalTitle.textContent = project.title;
                modalDescription.textContent = project.description;
                
                modalGallery.innerHTML = ''; // Clear previous images
                project.images.forEach(src => {
                    const img = document.createElement('img');
                    img.src = src;
                    img.alt = project.title;
                    modalGallery.appendChild(img);
                });

                modalDetails.innerHTML = ''; // Clear previous details
                project.details.forEach(detail => {
                    const li = document.createElement('li');
                    li.innerHTML = detail; // Use innerHTML to parse strong tags
                    modalDetails.appendChild(li);
                });

                if (project.link && project.link !== '#') {
                    modalLink.href = project.link;
                    modalLink.style.display = 'inline-block';
                } else {
                    modalLink.style.display = 'none';
                }

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling background
            }
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // --- Testimonials Display (removed carousel functionality) ---
    // All testimonials are now displayed in a grid layout

    // --- Scroll to Contact Function (for "Обсудить" buttons) ---
    window.scrollToContact = function() {
        document.getElementById('contact').scrollIntoView({ 
            behavior: 'smooth' 
        });
        modal.style.display = 'none'; // Close modal if open
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    // --- Burger Menu for Mobile ---
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burgerMenu.classList.toggle('open');
    });

    // Close menu when clicking outside (optional, but good UX)
    document.addEventListener('click', (event) => {
        if (!nav.contains(event.target) && !burgerMenu.contains(event.target)) {
            navLinks.classList.remove('active');
            burgerMenu.classList.remove('open');
        }
    });

    // --- Copy buttons functionality ---
    const copyButtons = document.querySelectorAll('.copy-button');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Create temporary notification
                const notification = document.createElement('div');
                notification.textContent = 'Скопировано!';
                notification.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--primary);
                    color: var(--dark);
                    padding: 10px 20px;
                    border-radius: 5px;
                    z-index: 1000;
                    font-weight: bold;
                    animation: fadeInOut 2s ease;
                `;
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 2000);
            }).catch(err => {
                console.error('Ошибка копирования: ', err);
                alert('Не удалось скопировать. Пожалуйста, скопируйте вручную: ' + textToCopy);
            });
        });
    });

    // --- Custom Logic for Service Buttons ---
    const serviceDiscussButtons = document.querySelectorAll('.service-card .btn-secondary');
    const telegramLink = 'https://t.me/mintyfoxz'; // Ваш Telegram

    serviceDiscussButtons.forEach(button => {
        // Проверяем, что это не кнопка "Заказать за 500₽", которая уже имеет href
        if (!button.href) { 
            button.addEventListener('click', () => {
                window.open(telegramLink, '_blank');
            });
        }
    });

    // --- Minecraft Server Invitation Popup ---
    // Show the popup when the page loads
    window.addEventListener('load', () => {
        const popup = document.getElementById('minecraft-popup');
        if (popup) {
            // Check if user has already closed the popup in this session
            if (!sessionStorage.getItem('minecraftPopupClosed')) {
                setTimeout(() => {
                    popup.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling background
                }, 1000); // Show after 1 second
            }
        }
    });

    // Close popup when clicking the close button
    const closePopupButton = document.getElementById('close-popup-btn');
    if (closePopupButton) {
        closePopupButton.addEventListener('click', () => {
            const popup = document.getElementById('minecraft-popup');
            if (popup) {
                popup.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
                // Remember that the user closed the popup in this session
                sessionStorage.setItem('minecraftPopupClosed', 'true');
            }
        });
    }

    // Close popup when clicking the X button
    const closePopupX = document.querySelector('.close-popup');
    if (closePopupX) {
        closePopupX.addEventListener('click', () => {
            const popup = document.getElementById('minecraft-popup');
            if (popup) {
                popup.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
                // Remember that the user closed the popup in this session
                sessionStorage.setItem('minecraftPopupClosed', 'true');
            }
        });
    }

    // Close popup when clicking outside the content
    const popup = document.getElementById('minecraft-popup');
    if (popup) {
        popup.addEventListener('click', (event) => {
            if (event.target === popup) {
                popup.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
                // Remember that the user closed the popup in this session
                sessionStorage.setItem('minecraftPopupClosed', 'true');
            }
        });
    }
});

