!function (global) {
    "use strict";
    function InfTree() {
        function huft_build(b, bindex, n, s, d, e, t, m, hp, hn, v) {
            var a, f, g, h, i, j, k, l, mask, p, q, w, xp, y, z;
            p = 0, i = n;
            do c[b[bindex + p]]++, p++, i--; while (0 !== i);
            if (c[0] == n)return t[0] = -1, m[0] = 0, Z_OK;
            for (l = m[0], j = 1; BMAX >= j && 0 === c[j]; j++);
            for (k = j, j > l && (l = j), i = BMAX; 0 !== i && 0 === c[i]; i--);
            for (g = i, l > i && (l = i), m[0] = l, y = 1 << j; i > j; j++, y <<= 1)if ((y -= c[j]) < 0)return Z_DATA_ERROR;
            if ((y -= c[i]) < 0)return Z_DATA_ERROR;
            for (c[i] += y, x[1] = j = 0, p = 1, xp = 2; 0 !== --i;)x[xp] = j += c[p], xp++, p++;
            i = 0, p = 0;
            do 0 !== (j = b[bindex + p]) && (v[x[j]++] = i), p++; while (++i < n);
            for (n = x[g], x[0] = i = 0, p = 0, h = -1, w = -l, u[0] = 0, q = 0, z = 0; g >= k; k++)for (a = c[k]; 0 !== a--;) {
                for (; k > w + l;) {
                    if (h++, w += l, z = g - w, z = z > l ? l : z, (f = 1 << (j = k - w)) > a + 1 && (f -= a + 1, xp = k, z > j))for (; ++j < z && !((f <<= 1) <= c[++xp]);)f -= c[xp];
                    if (z = 1 << j, hn[0] + z > MANY)return Z_DATA_ERROR;
                    u[h] = q = hn[0], hn[0] += z, 0 !== h ? (x[h] = i, r[0] = j, r[1] = l, j = i >>> w - l, r[2] = q - u[h - 1] - j, hp.set(r, 3 * (u[h - 1] + j))) : t[0] = q
                }
                for (r[1] = k - w, p >= n ? r[0] = 192 : v[p] < s ? (r[0] = v[p] < 256 ? 0 : 96, r[2] = v[p++]) : (r[0] = e[v[p] - s] + 16 + 64, r[2] = d[v[p++] - s]), f = 1 << k - w, j = i >>> w; z > j; j += f)hp.set(r, 3 * (q + j));
                for (j = 1 << k - 1; 0 !== (i & j); j >>>= 1)i ^= j;
                for (i ^= j, mask = (1 << w) - 1; (i & mask) != x[h];)h--, w -= l, mask = (1 << w) - 1
            }
            return 0 !== y && 1 != g ? Z_BUF_ERROR : Z_OK
        }

        function initWorkArea(vsize) {
            var i;
            for (hn || (hn = [], v = [], c = new Int32Array(BMAX + 1), r = [], u = new Int32Array(BMAX), x = new Int32Array(BMAX + 1)), v.length < vsize && (v = []), i = 0; vsize > i; i++)v[i] = 0;
            for (i = 0; BMAX + 1 > i; i++)c[i] = 0;
            for (i = 0; 3 > i; i++)r[i] = 0;
            u.set(c.subarray(0, BMAX), 0), x.set(c.subarray(0, BMAX + 1), 0)
        }

        var hn, v, c, r, u, x, that = this;
        that.inflate_trees_bits = function (c, bb, tb, hp, z) {
            var result;
            return initWorkArea(19), hn[0] = 0, result = huft_build(c, 0, 19, 19, null, null, tb, bb, hp, hn, v), result == Z_DATA_ERROR ? z.msg = "oversubscribed dynamic bit lengths tree" : result != Z_BUF_ERROR && 0 !== bb[0] || (z.msg = "incomplete dynamic bit lengths tree", result = Z_DATA_ERROR), result
        }, that.inflate_trees_dynamic = function (nl, nd, c, bl, bd, tl, td, hp, z) {
            var result;
            return initWorkArea(288), hn[0] = 0, result = huft_build(c, 0, nl, 257, cplens, cplext, tl, bl, hp, hn, v), result != Z_OK || 0 === bl[0] ? (result == Z_DATA_ERROR ? z.msg = "oversubscribed literal/length tree" : result != Z_MEM_ERROR && (z.msg = "incomplete literal/length tree", result = Z_DATA_ERROR), result) : (initWorkArea(288), result = huft_build(c, nl, nd, 0, cpdist, cpdext, td, bd, hp, hn, v), result != Z_OK || 0 === bd[0] && nl > 257 ? (result == Z_DATA_ERROR ? z.msg = "oversubscribed distance tree" : result == Z_BUF_ERROR ? (z.msg = "incomplete distance tree", result = Z_DATA_ERROR) : result != Z_MEM_ERROR && (z.msg = "empty distance tree with lengths", result = Z_DATA_ERROR), result) : Z_OK)
        }
    }

    function InfCodes() {
        function inflate_fast(bl, bd, tl, tl_index, td, td_index, s, z) {
            var t, tp, tp_index, e, b, k, p, n, q, m, ml, md, c, d, r, tp_index_t_3;
            p = z.next_in_index, n = z.avail_in, b = s.bitb, k = s.bitk, q = s.write, m = q < s.read ? s.read - q - 1 : s.end - q, ml = inflate_mask[bl], md = inflate_mask[bd];
            do {
                for (; 20 > k;)n--, b |= (255 & z.read_byte(p++)) << k, k += 8;
                if (t = b & ml, tp = tl, tp_index = tl_index, tp_index_t_3 = 3 * (tp_index + t), 0 !== (e = tp[tp_index_t_3]))for (; ;) {
                    if (b >>= tp[tp_index_t_3 + 1], k -= tp[tp_index_t_3 + 1], 0 !== (16 & e)) {
                        for (e &= 15, c = tp[tp_index_t_3 + 2] + (b & inflate_mask[e]), b >>= e, k -= e; 15 > k;)n--, b |= (255 & z.read_byte(p++)) << k, k += 8;
                        for (t = b & md, tp = td, tp_index = td_index, tp_index_t_3 = 3 * (tp_index + t), e = tp[tp_index_t_3]; ;) {
                            if (b >>= tp[tp_index_t_3 + 1], k -= tp[tp_index_t_3 + 1], 0 !== (16 & e)) {
                                for (e &= 15; e > k;)n--, b |= (255 & z.read_byte(p++)) << k, k += 8;
                                if (d = tp[tp_index_t_3 + 2] + (b & inflate_mask[e]), b >>= e, k -= e, m -= c, q >= d)r = q - d, q - r > 0 && 2 > q - r ? (s.window[q++] = s.window[r++], s.window[q++] = s.window[r++], c -= 2) : (s.window.set(s.window.subarray(r, r + 2), q), q += 2, r += 2, c -= 2); else {
                                    r = q - d;
                                    do r += s.end; while (0 > r);
                                    if (e = s.end - r, c > e) {
                                        if (c -= e, q - r > 0 && e > q - r) {
                                            do s.window[q++] = s.window[r++]; while (0 !== --e)
                                        } else s.window.set(s.window.subarray(r, r + e), q), q += e, r += e, e = 0;
                                        r = 0
                                    }
                                }
                                if (q - r > 0 && c > q - r) {
                                    do s.window[q++] = s.window[r++]; while (0 !== --c)
                                } else s.window.set(s.window.subarray(r, r + c), q), q += c, r += c, c = 0;
                                break
                            }
                            if (0 !== (64 & e))return z.msg = "invalid distance code", c = z.avail_in - n, c = c > k >> 3 ? k >> 3 : c, n += c, p -= c, k -= c << 3, s.bitb = b, s.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, s.write = q, Z_DATA_ERROR;
                            t += tp[tp_index_t_3 + 2], t += b & inflate_mask[e], tp_index_t_3 = 3 * (tp_index + t), e = tp[tp_index_t_3]
                        }
                        break
                    }
                    if (0 !== (64 & e))return 0 !== (32 & e) ? (c = z.avail_in - n, c = c > k >> 3 ? k >> 3 : c, n += c, p -= c, k -= c << 3, s.bitb = b, s.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, s.write = q, Z_STREAM_END) : (z.msg = "invalid literal/length code", c = z.avail_in - n, c = c > k >> 3 ? k >> 3 : c, n += c, p -= c, k -= c << 3, s.bitb = b, s.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, s.write = q, Z_DATA_ERROR);
                    if (t += tp[tp_index_t_3 + 2], t += b & inflate_mask[e], tp_index_t_3 = 3 * (tp_index + t), 0 === (e = tp[tp_index_t_3])) {
                        b >>= tp[tp_index_t_3 + 1], k -= tp[tp_index_t_3 + 1], s.window[q++] = tp[tp_index_t_3 + 2], m--;
                        break
                    }
                } else b >>= tp[tp_index_t_3 + 1], k -= tp[tp_index_t_3 + 1], s.window[q++] = tp[tp_index_t_3 + 2], m--
            } while (m >= 258 && n >= 10);
            return c = z.avail_in - n, c = c > k >> 3 ? k >> 3 : c, n += c, p -= c, k -= c << 3, s.bitb = b, s.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, s.write = q, Z_OK
        }

        var mode, tree, ltree, dtree, that = this, len = 0, tree_index = 0, need = 0, lit = 0, get = 0, dist = 0, lbits = 0, dbits = 0, ltree_index = 0, dtree_index = 0;
        that.init = function (bl, bd, tl, tl_index, td, td_index) {
            mode = START, lbits = bl, dbits = bd, ltree = tl, ltree_index = tl_index, dtree = td, dtree_index = td_index, tree = null
        }, that.proc = function (s, z, r) {
            var j, tindex, e, n, q, m, f, b = 0, k = 0, p = 0;
            for (p = z.next_in_index, n = z.avail_in, b = s.bitb, k = s.bitk, q = s.write, m = q < s.read ? s.read - q - 1 : s.end - q; ;)switch (mode) {
                case START:
                    if (m >= 258 && n >= 10 && (s.bitb = b, s.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, s.write = q, r = inflate_fast(lbits, dbits, ltree, ltree_index, dtree, dtree_index, s, z), p = z.next_in_index, n = z.avail_in, b = s.bitb, k = s.bitk, q = s.write, m = q < s.read ? s.read - q - 1 : s.end - q, r != Z_OK)) {
                        mode = r == Z_STREAM_END ? WASH : BADCODE;
                        break
                    }
                    need = lbits, tree = ltree, tree_index = ltree_index, mode = LEN;
                case LEN:
                    for (j = need; j > k;) {
                        if (0 === n)return s.bitb = b, s.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, s.write = q, s.inflate_flush(z, r);
                        r = Z_OK, n--, b |= (255 & z.read_byte(p++)) << k, k += 8
                    }
                    if (tindex = 3 * (tree_index + (b & inflate_mask[j])), b >>>= tree[tindex + 1], k -= tree[tindex + 1], e = tree[tindex], 0 === e) {
                        lit = tree[tindex + 2], mode = LIT;
                        break
                    }
                    if (0 !== (16 & e)) {
                        get = 15 & e, len = tree[tindex + 2], mode = LENEXT;
                        break
                    }
                    if (0 === (64 & e)) {
                        need = e, tree_index = tindex / 3 + tree[tindex + 2];
                        break
                    }
                    if (0 !== (32 & e)) {
                        mode = WASH;
                        break
                    }
                    return mode = BADCODE, z.msg = "invalid literal/length code", r = Z_DATA_ERROR, s.bitb = b, s.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, s.write = q, s.inflate_flush(z, r);
                case LENEXT:
                    for (j = get; j > k;) {
                        if (0 === n)return s.bitb = b, s.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, s.write = q, s.inflate_flush(z, r);
                        r = Z_OK, n--, b |= (255 & z.read_byte(p++)) << k, k += 8
                    }
                    len += b & inflate_mask[j], b >>= j, k -= j, need = dbits, tree = dtree, tree_index = dtree_index, mode = DIST;
                case DIST:
                    for (j = need; j > k;) {
                        if (0 === n)return s.bitb = b, s.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, s.write = q, s.inflate_flush(z, r);
                        r = Z_OK, n--, b |= (255 & z.read_byte(p++)) << k, k += 8
                    }
                    if (tindex = 3 * (tree_index + (b & inflate_mask[j])), b >>= tree[tindex + 1], k -= tree[tindex + 1], e = tree[tindex], 0 !== (16 & e)) {
                        get = 15 & e, dist = tree[tindex + 2], mode = DISTEXT;
                        break
                    }
                    if (0 === (64 & e)) {
                        need = e, tree_index = tindex / 3 + tree[tindex + 2];
                        break
                    }
                    return mode = BADCODE, z.msg = "invalid distance code", r = Z_DATA_ERROR, s.bitb = b, s.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, s.write = q, s.inflate_flush(z, r);
                case DISTEXT:
                    for (j = get; j > k;) {
                        if (0 === n)return s.bitb = b, s.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, s.write = q, s.inflate_flush(z, r);
                        r = Z_OK, n--, b |= (255 & z.read_byte(p++)) << k, k += 8
                    }
                    dist += b & inflate_mask[j], b >>= j, k -= j, mode = COPY;
                case COPY:
                    for (f = q - dist; 0 > f;)f += s.end;
                    for (; 0 !== len;) {
                        if (0 === m && (q == s.end && 0 !== s.read && (q = 0, m = q < s.read ? s.read - q - 1 : s.end - q), 0 === m && (s.write = q, r = s.inflate_flush(z, r), q = s.write, m = q < s.read ? s.read - q - 1 : s.end - q, q == s.end && 0 !== s.read && (q = 0, m = q < s.read ? s.read - q - 1 : s.end - q), 0 === m)))return s.bitb = b, s.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, s.write = q, s.inflate_flush(z, r);
                        s.window[q++] = s.window[f++], m--, f == s.end && (f = 0), len--
                    }
                    mode = START;
                    break;
                case LIT:
                    if (0 === m && (q == s.end && 0 !== s.read && (q = 0, m = q < s.read ? s.read - q - 1 : s.end - q), 0 === m && (s.write = q, r = s.inflate_flush(z, r), q = s.write, m = q < s.read ? s.read - q - 1 : s.end - q, q == s.end && 0 !== s.read && (q = 0, m = q < s.read ? s.read - q - 1 : s.end - q), 0 === m)))return s.bitb = b, s.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, s.write = q, s.inflate_flush(z, r);
                    r = Z_OK, s.window[q++] = lit, m--, mode = START;
                    break;
                case WASH:
                    if (k > 7 && (k -= 8, n++, p--), s.write = q, r = s.inflate_flush(z, r), q = s.write, m = q < s.read ? s.read - q - 1 : s.end - q, s.read != s.write)return s.bitb = b, s.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, s.write = q, s.inflate_flush(z, r);
                    mode = END;
                case END:
                    return r = Z_STREAM_END, s.bitb = b, s.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, s.write = q, s.inflate_flush(z, r);
                case BADCODE:
                    return r = Z_DATA_ERROR, s.bitb = b, s.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, s.write = q, s.inflate_flush(z, r);
                default:
                    return r = Z_STREAM_ERROR, s.bitb = b, s.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, s.write = q, s.inflate_flush(z, r)
            }
        }, that.free = function () {
        }
    }

    function InfBlocks(z, w) {
        var blens, that = this, mode = TYPE, left = 0, table = 0, index = 0, bb = [0], tb = [0], codes = new InfCodes, last = 0, hufts = new Int32Array(3 * MANY), check = 0, inftree = new InfTree;
        that.bitk = 0, that.bitb = 0, that.window = new Uint8Array(w), that.end = w, that.read = 0, that.write = 0, that.reset = function (z, c) {
            c && (c[0] = check), mode == CODES && codes.free(z), mode = TYPE, that.bitk = 0, that.bitb = 0, that.read = that.write = 0
        }, that.reset(z, null), that.inflate_flush = function (z, r) {
            var n, p, q;
            return p = z.next_out_index, q = that.read, n = (q <= that.write ? that.write : that.end) - q, n > z.avail_out && (n = z.avail_out), 0 !== n && r == Z_BUF_ERROR && (r = Z_OK), z.avail_out -= n, z.total_out += n, z.next_out.set(that.window.subarray(q, q + n), p), p += n, q += n, q == that.end && (q = 0, that.write == that.end && (that.write = 0), n = that.write - q, n > z.avail_out && (n = z.avail_out), 0 !== n && r == Z_BUF_ERROR && (r = Z_OK), z.avail_out -= n, z.total_out += n, z.next_out.set(that.window.subarray(q, q + n), p), p += n, q += n), z.next_out_index = p, that.read = q, r
        }, that.proc = function (z, r) {
            var t, b, k, p, n, q, m, i;
            for (p = z.next_in_index, n = z.avail_in, b = that.bitb, k = that.bitk, q = that.write, m = q < that.read ? that.read - q - 1 : that.end - q; ;)switch (mode) {
                case TYPE:
                    for (; 3 > k;) {
                        if (0 === n)return that.bitb = b, that.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, that.write = q, that.inflate_flush(z, r);
                        r = Z_OK, n--, b |= (255 & z.read_byte(p++)) << k, k += 8
                    }
                    switch (t = 7 & b, last = 1 & t, t >>> 1) {
                        case 0:
                            b >>>= 3, k -= 3, t = 7 & k, b >>>= t, k -= t, mode = LENS;
                            break;
                        case 1:
                            var bl = [], bd = [], tl = [[]], td = [[]];
                            InfTree.inflate_trees_fixed(bl, bd, tl, td), codes.init(bl[0], bd[0], tl[0], 0, td[0], 0), b >>>= 3, k -= 3, mode = CODES;
                            break;
                        case 2:
                            b >>>= 3, k -= 3, mode = TABLE;
                            break;
                        case 3:
                            return b >>>= 3, k -= 3, mode = BADBLOCKS, z.msg = "invalid block type", r = Z_DATA_ERROR, that.bitb = b, that.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, that.write = q, that.inflate_flush(z, r)
                    }
                    break;
                case LENS:
                    for (; 32 > k;) {
                        if (0 === n)return that.bitb = b, that.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, that.write = q, that.inflate_flush(z, r);
                        r = Z_OK, n--, b |= (255 & z.read_byte(p++)) << k, k += 8
                    }
                    if ((~b >>> 16 & 65535) != (65535 & b))return mode = BADBLOCKS, z.msg = "invalid stored block lengths", r = Z_DATA_ERROR, that.bitb = b, that.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, that.write = q, that.inflate_flush(z, r);
                    left = 65535 & b, b = k = 0, mode = 0 !== left ? STORED : 0 !== last ? DRY : TYPE;
                    break;
                case STORED:
                    if (0 === n)return that.bitb = b, that.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, that.write = q, that.inflate_flush(z, r);
                    if (0 === m && (q == that.end && 0 !== that.read && (q = 0, m = q < that.read ? that.read - q - 1 : that.end - q), 0 === m && (that.write = q, r = that.inflate_flush(z, r), q = that.write, m = q < that.read ? that.read - q - 1 : that.end - q, q == that.end && 0 !== that.read && (q = 0, m = q < that.read ? that.read - q - 1 : that.end - q), 0 === m)))return that.bitb = b, that.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, that.write = q, that.inflate_flush(z, r);
                    if (r = Z_OK, t = left, t > n && (t = n), t > m && (t = m), that.window.set(z.read_buf(p, t), q), p += t, n -= t, q += t, m -= t, 0 !== (left -= t))break;
                    mode = 0 !== last ? DRY : TYPE;
                    break;
                case TABLE:
                    for (; 14 > k;) {
                        if (0 === n)return that.bitb = b, that.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, that.write = q, that.inflate_flush(z, r);
                        r = Z_OK, n--, b |= (255 & z.read_byte(p++)) << k, k += 8
                    }
                    if (table = t = 16383 & b, (31 & t) > 29 || (t >> 5 & 31) > 29)return mode = BADBLOCKS, z.msg = "too many length or distance symbols", r = Z_DATA_ERROR, that.bitb = b, that.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, that.write = q, that.inflate_flush(z, r);
                    if (t = 258 + (31 & t) + (t >> 5 & 31), !blens || blens.length < t)blens = []; else for (i = 0; t > i; i++)blens[i] = 0;
                    b >>>= 14, k -= 14, index = 0, mode = BTREE;
                case BTREE:
                    for (; 4 + (table >>> 10) > index;) {
                        for (; 3 > k;) {
                            if (0 === n)return that.bitb = b, that.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, that.write = q, that.inflate_flush(z, r);
                            r = Z_OK, n--, b |= (255 & z.read_byte(p++)) << k, k += 8
                        }
                        blens[border[index++]] = 7 & b, b >>>= 3, k -= 3
                    }
                    for (; 19 > index;)blens[border[index++]] = 0;
                    if (bb[0] = 7, t = inftree.inflate_trees_bits(blens, bb, tb, hufts, z), t != Z_OK)return r = t, r == Z_DATA_ERROR && (blens = null, mode = BADBLOCKS), that.bitb = b, that.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, that.write = q, that.inflate_flush(z, r);
                    index = 0, mode = DTREE;
                case DTREE:
                    for (; ;) {
                        if (t = table, index >= 258 + (31 & t) + (t >> 5 & 31))break;
                        var j, c;
                        for (t = bb[0]; t > k;) {
                            if (0 === n)return that.bitb = b, that.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, that.write = q, that.inflate_flush(z, r);
                            r = Z_OK, n--, b |= (255 & z.read_byte(p++)) << k, k += 8
                        }
                        if (t = hufts[3 * (tb[0] + (b & inflate_mask[t])) + 1], c = hufts[3 * (tb[0] + (b & inflate_mask[t])) + 2], 16 > c)b >>>= t, k -= t, blens[index++] = c; else {
                            for (i = 18 == c ? 7 : c - 14, j = 18 == c ? 11 : 3; t + i > k;) {
                                if (0 === n)return that.bitb = b, that.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, that.write = q, that.inflate_flush(z, r);
                                r = Z_OK, n--, b |= (255 & z.read_byte(p++)) << k, k += 8
                            }
                            if (b >>>= t, k -= t, j += b & inflate_mask[i], b >>>= i, k -= i, i = index, t = table, i + j > 258 + (31 & t) + (t >> 5 & 31) || 16 == c && 1 > i)return blens = null, mode = BADBLOCKS, z.msg = "invalid bit length repeat", r = Z_DATA_ERROR, that.bitb = b, that.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, that.write = q, that.inflate_flush(z, r);
                            c = 16 == c ? blens[i - 1] : 0;
                            do blens[i++] = c; while (0 !== --j);
                            index = i
                        }
                    }
                    tb[0] = -1;
                    var bl_ = [], bd_ = [], tl_ = [], td_ = [];
                    if (bl_[0] = 9, bd_[0] = 6, t = table, t = inftree.inflate_trees_dynamic(257 + (31 & t), 1 + (t >> 5 & 31), blens, bl_, bd_, tl_, td_, hufts, z), t != Z_OK)return t == Z_DATA_ERROR && (blens = null, mode = BADBLOCKS), r = t, that.bitb = b, that.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, that.write = q, that.inflate_flush(z, r);
                    codes.init(bl_[0], bd_[0], hufts, tl_[0], hufts, td_[0]), mode = CODES;
                case CODES:
                    if (that.bitb = b, that.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, that.write = q, (r = codes.proc(that, z, r)) != Z_STREAM_END)return that.inflate_flush(z, r);
                    if (r = Z_OK, codes.free(z), p = z.next_in_index, n = z.avail_in, b = that.bitb, k = that.bitk, q = that.write, m = q < that.read ? that.read - q - 1 : that.end - q, 0 === last) {
                        mode = TYPE;
                        break
                    }
                    mode = DRY;
                case DRY:
                    if (that.write = q, r = that.inflate_flush(z, r), q = that.write, m = q < that.read ? that.read - q - 1 : that.end - q, that.read != that.write)return that.bitb = b, that.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, that.write = q, that.inflate_flush(z, r);
                    mode = DONELOCKS;
                case DONELOCKS:
                    return r = Z_STREAM_END, that.bitb = b, that.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, that.write = q, that.inflate_flush(z, r);
                case BADBLOCKS:
                    return r = Z_DATA_ERROR, that.bitb = b, that.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, that.write = q, that.inflate_flush(z, r);
                default:
                    return r = Z_STREAM_ERROR, that.bitb = b, that.bitk = k, z.avail_in = n, z.total_in += p - z.next_in_index, z.next_in_index = p, that.write = q, that.inflate_flush(z, r)
            }
        }, that.free = function (z) {
            that.reset(z, null), that.window = null, hufts = null
        }, that.set_dictionary = function (d, start, n) {
            that.window.set(d.subarray(start, start + n), 0), that.read = that.write = n
        }, that.sync_point = function () {
            return mode == LENS ? 1 : 0
        }
    }

    function Inflate() {
        function inflateReset(z) {
            return z && z.istate ? (z.total_in = z.total_out = 0, z.msg = null, z.istate.mode = BLOCKS, z.istate.blocks.reset(z, null), Z_OK) : Z_STREAM_ERROR
        }

        var that = this;
        that.mode = 0, that.method = 0, that.was = [0], that.need = 0, that.marker = 0, that.wbits = 0, that.inflateEnd = function (z) {
            return that.blocks && that.blocks.free(z), that.blocks = null, Z_OK
        }, that.inflateInit = function (z, w) {
            return z.msg = null, that.blocks = null, 8 > w || w > 15 ? (that.inflateEnd(z), Z_STREAM_ERROR) : (that.wbits = w, z.istate.blocks = new InfBlocks(z, 1 << w), inflateReset(z), Z_OK)
        }, that.inflate = function (z, f) {
            var r, b;
            if (!z || !z.istate || !z.next_in)return Z_STREAM_ERROR;
            for (f = f == Z_FINISH ? Z_BUF_ERROR : Z_OK, r = Z_BUF_ERROR; ;)switch (z.istate.mode) {
                case METHOD:
                    if (0 === z.avail_in)return r;
                    if (r = f, z.avail_in--, z.total_in++, (15 & (z.istate.method = z.read_byte(z.next_in_index++))) != Z_DEFLATED) {
                        z.istate.mode = BAD, z.msg = "unknown compression method", z.istate.marker = 5;
                        break
                    }
                    if ((z.istate.method >> 4) + 8 > z.istate.wbits) {
                        z.istate.mode = BAD, z.msg = "invalid window size", z.istate.marker = 5;
                        break
                    }
                    z.istate.mode = FLAG;
                case FLAG:
                    if (0 === z.avail_in)return r;
                    if (r = f, z.avail_in--, z.total_in++, b = 255 & z.read_byte(z.next_in_index++), ((z.istate.method << 8) + b) % 31 !== 0) {
                        z.istate.mode = BAD, z.msg = "incorrect header check", z.istate.marker = 5;
                        break
                    }
                    if (0 === (b & PRESET_DICT)) {
                        z.istate.mode = BLOCKS;
                        break
                    }
                    z.istate.mode = DICT4;
                case DICT4:
                    if (0 === z.avail_in)return r;
                    r = f, z.avail_in--, z.total_in++, z.istate.need = (255 & z.read_byte(z.next_in_index++)) << 24 & 4278190080, z.istate.mode = DICT3;
                case DICT3:
                    if (0 === z.avail_in)return r;
                    r = f, z.avail_in--, z.total_in++, z.istate.need += (255 & z.read_byte(z.next_in_index++)) << 16 & 16711680, z.istate.mode = DICT2;
                case DICT2:
                    if (0 === z.avail_in)return r;
                    r = f, z.avail_in--, z.total_in++, z.istate.need += (255 & z.read_byte(z.next_in_index++)) << 8 & 65280, z.istate.mode = DICT1;
                case DICT1:
                    return 0 === z.avail_in ? r : (r = f, z.avail_in--, z.total_in++, z.istate.need += 255 & z.read_byte(z.next_in_index++), z.istate.mode = DICT0, Z_NEED_DICT);
                case DICT0:
                    return z.istate.mode = BAD, z.msg = "need dictionary", z.istate.marker = 0, Z_STREAM_ERROR;
                case BLOCKS:
                    if (r = z.istate.blocks.proc(z, r), r == Z_DATA_ERROR) {
                        z.istate.mode = BAD, z.istate.marker = 0;
                        break
                    }
                    if (r == Z_OK && (r = f), r != Z_STREAM_END)return r;
                    r = f, z.istate.blocks.reset(z, z.istate.was), z.istate.mode = DONE;
                case DONE:
                    return Z_STREAM_END;
                case BAD:
                    return Z_DATA_ERROR;
                default:
                    return Z_STREAM_ERROR
            }
        }, that.inflateSetDictionary = function (z, dictionary, dictLength) {
            var index = 0, length = dictLength;
            return z && z.istate && z.istate.mode == DICT0 ? (length >= 1 << z.istate.wbits && (length = (1 << z.istate.wbits) - 1, index = dictLength - length), z.istate.blocks.set_dictionary(dictionary, index, length), z.istate.mode = BLOCKS, Z_OK) : Z_STREAM_ERROR
        }, that.inflateSync = function (z) {
            var n, p, m, r, w;
            if (!z || !z.istate)return Z_STREAM_ERROR;
            if (z.istate.mode != BAD && (z.istate.mode = BAD, z.istate.marker = 0), 0 === (n = z.avail_in))return Z_BUF_ERROR;
            for (p = z.next_in_index, m = z.istate.marker; 0 !== n && 4 > m;)z.read_byte(p) == mark[m] ? m++ : m = 0 !== z.read_byte(p) ? 0 : 4 - m, p++, n--;
            return z.total_in += p - z.next_in_index, z.next_in_index = p, z.avail_in = n, z.istate.marker = m, 4 != m ? Z_DATA_ERROR : (r = z.total_in, w = z.total_out, inflateReset(z), z.total_in = r, z.total_out = w, z.istate.mode = BLOCKS, Z_OK)
        }, that.inflateSyncPoint = function (z) {
            return z && z.istate && z.istate.blocks ? z.istate.blocks.sync_point() : Z_STREAM_ERROR
        }
    }

    function ZStream() {
    }

    function Inflater() {
        var that = this, z = new ZStream, bufsize = 512, flush = Z_NO_FLUSH, buf = new Uint8Array(bufsize), nomoreinput = !1;
        z.inflateInit(), z.next_out = buf, that.append = function (data, onprogress) {
            var err, array, buffers = [], lastIndex = 0, bufferIndex = 0, bufferSize = 0;
            if (0 !== data.length) {
                z.next_in_index = 0, z.next_in = data, z.avail_in = data.length;
                do {
                    if (z.next_out_index = 0, z.avail_out = bufsize, 0 !== z.avail_in || nomoreinput || (z.next_in_index = 0, nomoreinput = !0), err = z.inflate(flush), nomoreinput && err === Z_BUF_ERROR) {
                        if (0 !== z.avail_in)throw new Error("inflating: bad input")
                    } else if (err !== Z_OK && err !== Z_STREAM_END)throw new Error("inflating: " + z.msg);
                    if ((nomoreinput || err === Z_STREAM_END) && z.avail_in === data.length)throw new Error("inflating: bad input");
                    z.next_out_index && (z.next_out_index === bufsize ? buffers.push(new Uint8Array(buf)) : buffers.push(new Uint8Array(buf.subarray(0, z.next_out_index)))), bufferSize += z.next_out_index, onprogress && z.next_in_index > 0 && z.next_in_index != lastIndex && (onprogress(z.next_in_index), lastIndex = z.next_in_index)
                } while (z.avail_in > 0 || 0 === z.avail_out);
                return array = new Uint8Array(bufferSize), buffers.forEach(function (chunk) {
                    array.set(chunk, bufferIndex), bufferIndex += chunk.length
                }), array
            }
        }, that.flush = function () {
            z.inflateEnd()
        }
    }

    var MAX_BITS = 15, Z_OK = 0, Z_STREAM_END = 1, Z_NEED_DICT = 2, Z_STREAM_ERROR = -2, Z_DATA_ERROR = -3, Z_MEM_ERROR = -4, Z_BUF_ERROR = -5, inflate_mask = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535], MANY = 1440, Z_NO_FLUSH = 0, Z_FINISH = 4, fixed_bl = 9, fixed_bd = 5, fixed_tl = [96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 192, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 160, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0, 9, 224, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 144, 83, 7, 59, 0, 8, 120, 0, 8, 56, 0, 9, 208, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 176, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 240, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 200, 81, 7, 13, 0, 8, 100, 0, 8, 36, 0, 9, 168, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 232, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 152, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 216, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 184, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 248, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 196, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 164, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 228, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 148, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 212, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 180, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 244, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 204, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 172, 0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 236, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 156, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 220, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 188, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 252, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 194, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 162, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 226, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 146, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 210, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 178, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 242, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 202, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 170, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 234, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 154, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 218, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 186, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 250, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 198, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 166, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 230, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 150, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 214, 82, 7, 19, 0, 8, 107, 0, 8, 43, 0, 9, 182, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 246, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 206, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 174, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 238, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 158, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 222, 82, 7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 190, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 254, 96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 193, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 161, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0, 9, 225, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 145, 83, 7, 59, 0, 8, 120, 0, 8, 56, 0, 9, 209, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 177, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 241, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 201, 81, 7, 13, 0, 8, 100, 0, 8, 36, 0, 9, 169, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 233, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 153, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 217, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 185, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 249, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 197, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 165, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 229, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 149, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 213, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 181, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 245, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 205, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 173, 0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 237, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 157, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 221, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 189, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 253, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 195, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 163, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 227, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 147, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 211, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 179, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 243, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 203, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 171, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 235, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 155, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 219, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 187, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 251, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 199, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 167, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 231, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 151, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 215, 82, 7, 19, 0, 8, 107, 0, 8, 43, 0, 9, 183, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 247, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 207, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 175, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 239, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 159, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 223, 82, 7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 191, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 255], fixed_td = [80, 5, 1, 87, 5, 257, 83, 5, 17, 91, 5, 4097, 81, 5, 5, 89, 5, 1025, 85, 5, 65, 93, 5, 16385, 80, 5, 3, 88, 5, 513, 84, 5, 33, 92, 5, 8193, 82, 5, 9, 90, 5, 2049, 86, 5, 129, 192, 5, 24577, 80, 5, 2, 87, 5, 385, 83, 5, 25, 91, 5, 6145, 81, 5, 7, 89, 5, 1537, 85, 5, 97, 93, 5, 24577, 80, 5, 4, 88, 5, 769, 84, 5, 49, 92, 5, 12289, 82, 5, 13, 90, 5, 3073, 86, 5, 193, 192, 5, 24577], cplens = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], cplext = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 112, 112], cpdist = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577], cpdext = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], BMAX = 15;
    InfTree.inflate_trees_fixed = function (bl, bd, tl, td) {
        return bl[0] = fixed_bl, bd[0] = fixed_bd, tl[0] = fixed_tl, td[0] = fixed_td, Z_OK
    };
    var START = 0, LEN = 1, LENEXT = 2, DIST = 3, DISTEXT = 4, COPY = 5, LIT = 6, WASH = 7, END = 8, BADCODE = 9, border = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], TYPE = 0, LENS = 1, STORED = 2, TABLE = 3, BTREE = 4, DTREE = 5, CODES = 6, DRY = 7, DONELOCKS = 8, BADBLOCKS = 9, PRESET_DICT = 32, Z_DEFLATED = 8, METHOD = 0, FLAG = 1, DICT4 = 2, DICT3 = 3, DICT2 = 4, DICT1 = 5, DICT0 = 6, BLOCKS = 7, DONE = 12, BAD = 13, mark = [0, 0, 255, 255];
    ZStream.prototype = {
        inflateInit: function (bits) {
            var that = this;
            return that.istate = new Inflate, bits || (bits = MAX_BITS), that.istate.inflateInit(that, bits)
        }, inflate: function (f) {
            var that = this;
            return that.istate ? that.istate.inflate(that, f) : Z_STREAM_ERROR
        }, inflateEnd: function () {
            var that = this;
            if (!that.istate)return Z_STREAM_ERROR;
            var ret = that.istate.inflateEnd(that);
            return that.istate = null, ret
        }, inflateSync: function () {
            var that = this;
            return that.istate ? that.istate.inflateSync(that) : Z_STREAM_ERROR
        }, inflateSetDictionary: function (dictionary, dictLength) {
            var that = this;
            return that.istate ? that.istate.inflateSetDictionary(that, dictionary, dictLength) : Z_STREAM_ERROR
        }, read_byte: function (start) {
            var that = this;
            return that.next_in.subarray(start, start + 1)[0]
        }, read_buf: function (start, size) {
            var that = this;
            return that.next_in.subarray(start, start + size)
        }
    };
    var env = global.zip || global;
    env.Inflater = env._jzlib_Inflater = Inflater
}(this);