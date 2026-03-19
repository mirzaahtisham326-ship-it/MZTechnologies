
//  FAQ SECTION —one item open at a time, click to toggle

document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close all other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            
            item.classList.toggle('active');
        });
    });
});



// APPROACH ACCORDION — Toggle open/close, one item open at a time

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;

    
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        item.classList.toggle('active');
    });
});



// REVIEWS SECTION — Load More Button (shows 4 more each click)

// document.addEventListener('DOMContentLoaded', function () {
//     const reviewsGrid = document.getElementById('reviewsGrid');
//     const loadMoreBtn = document.getElementById('loadMoreBtn');

//     if (!reviewsGrid || !loadMoreBtn) return; // Safety check

//     const reviews = reviewsGrid.querySelectorAll('.review-card');
//     let currentReviewsShown = 4;

//     function showReviews(limit) {
//         reviews.forEach((card, index) => {
//             if (index < limit) {
//                 card.classList.add('show');
//             } else {
//                 card.classList.remove('show');
//             }
//         });
//     }

//     // Show initial 4 reviews on page load
//     showReviews(currentReviewsShown);

//     loadMoreBtn.addEventListener('click', function () {
//         currentReviewsShown += 4;
//         showReviews(currentReviewsShown);

//         // Disable button when all reviews are visible
//         if (currentReviewsShown >= reviews.length) {
//             loadMoreBtn.textContent = 'All Reviews Loaded';
//             loadMoreBtn.disabled = true;
//         }
//     });
// });



// MODAL — Open, Close, and Click-Outside-to-Close

function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Disable background scroll
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}


window.addEventListener('click', function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});



// CONTACT FORM — PHP Mailer (No Third Party)

const contactFormEl = document.getElementById('contactFormEl');

if (contactFormEl) {
    contactFormEl.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const formStatus = document.getElementById('formStatus');

        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';


        const formData = new FormData(contactFormEl);

        try {
            const response = await fetch('contact.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            formStatus.style.display = 'block';

            if (result.status === 'success') {
             
                formStatus.style.background = 'rgba(41, 184, 212, 0.1)';
                formStatus.style.border = '1px solid rgba(41, 184, 212, 0.3)';
                formStatus.style.color = '#29b8d4';
                formStatus.textContent = '✓ Message sent successfully! We will reply soon.';
                contactFormEl.reset();
            } else {
             
                formStatus.style.background = 'rgba(220, 53, 69, 0.1)';
                formStatus.style.border = '1px solid rgba(220, 53, 69, 0.3)';
                formStatus.style.color = '#ff6b7a';
                formStatus.textContent = '✗ ' + (result.message || 'Try again.');
            }

        } catch (err) {
            formStatus.style.display = 'block';
            formStatus.style.background = 'rgba(220, 53, 69, 0.1)';
            formStatus.style.border = '1px solid rgba(220, 53, 69, 0.3)';
            formStatus.style.color = '#ff6b7a';
            formStatus.textContent = '✗ An error occurred. Please try again.';
        }


        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message →';

    
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    });
}